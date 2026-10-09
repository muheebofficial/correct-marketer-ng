"""Tiny storage layer over Astra DB (Data API) with an in-memory fallback for local dev."""
from __future__ import annotations

import threading
import uuid
from datetime import datetime, timezone
from functools import lru_cache
from typing import Any

from .config import CONTENT_COLLECTIONS, DATA_COLLECTIONS, settings


def is_post_due(doc: dict[str, Any]) -> bool:
    """Return True when a published post is eligible to be notified."""
    published_at = doc.get("publishedAt")
    if published_at is None:
        published_at = doc.get("published")
    if published_at in (None, "", False):
        return True

    if isinstance(published_at, datetime):
        dt = published_at
    elif isinstance(published_at, (int, float)):
        dt = datetime.fromtimestamp(float(published_at), tz=timezone.utc)
    elif isinstance(published_at, str):
        text = published_at.strip()
        if not text:
            return True
        if text.endswith("Z"):
            text = text[:-1] + "+00:00"
        try:
            dt = datetime.fromisoformat(text)
        except ValueError:
            return True
    else:
        return True

    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc) <= datetime.now(timezone.utc)


class MemoryStore:
    """Non-persistent store used when DEV_MEMORY_DB=1. Not for production."""

    def __init__(self) -> None:
        self._data: dict[str, dict[str, dict[str, Any]]] = {}
        self._lock = threading.Lock()

    def insert(self, name: str, doc: dict[str, Any]) -> str:
        doc = dict(doc)
        doc.setdefault("_id", str(uuid.uuid4()))
        with self._lock:
            self._data.setdefault(name, {})[doc["_id"]] = doc
        return doc["_id"]

    def list(self, name: str, flt: dict[str, Any] | None, limit: int) -> list[dict[str, Any]]:
        with self._lock:
            docs = list(self._data.get(name, {}).values())
        if flt:
            docs = [d for d in docs if all(d.get(k) == v for k, v in flt.items())]
        return docs[:limit]

    def get(self, name: str, doc_id: str) -> dict[str, Any] | None:
        with self._lock:
            return self._data.get(name, {}).get(doc_id)

    def upsert(self, name: str, doc_id: str, doc: dict[str, Any]) -> None:
        doc = {**doc, "_id": doc_id}
        with self._lock:
            self._data.setdefault(name, {})[doc_id] = doc

    def delete(self, name: str, doc_id: str) -> bool:
        with self._lock:
            return self._data.get(name, {}).pop(doc_id, None) is not None

    def claim_post_notification(self, slug: str) -> dict[str, Any] | None:
        with self._lock:
            doc = next(
                (
                    candidate
                    for candidate in self._data.get("posts", {}).values()
                    if candidate.get("slug") == slug or candidate.get("_id") == slug
                ),
                None,
            )
            if (
                not doc
                or doc.get("status") != "published"
                or doc.get("notified") is True
                or doc.get("notifyState") == "sending"
                or not is_post_due(doc)
            ):
                return None
            doc["notifyState"] = "sending"
            return dict(doc)

    def set_post_notification(self, slug: str, fields: dict[str, Any]) -> bool:
        with self._lock:
            doc = next(
                (
                    candidate
                    for candidate in self._data.get("posts", {}).values()
                    if candidate.get("slug") == slug or candidate.get("_id") == slug
                ),
                None,
            )
            if not doc:
                return False
            doc.update(fields)
            return True

    def mark_published_posts_notified(self, notified_at: str) -> int:
        with self._lock:
            posts = self._data.get("posts", {}).values()
            updated = 0
            for doc in posts:
                if doc.get("status") == "published" and doc.get("notified") is not True and is_post_due(doc):
                    doc.update({"notified": True, "notifiedAt": notified_at, "notifyState": "sent"})
                    updated += 1
            return updated


class AstraStore:
    """Astra DB via the Data API (astrapy). Collections are created on first use."""

    def __init__(self) -> None:
        from astrapy import DataAPIClient  # imported lazily so dev mode needs no Astra

        client = DataAPIClient(settings.astra_token)
        self._db = client.get_database(settings.astra_endpoint)
        self._known: set[str] = set(self._db.list_collection_names())

    def _col(self, name: str):
        if name not in self._known:
            self._db.create_collection(name)
            self._known.add(name)
        return self._db.get_collection(name)

    def insert(self, name: str, doc: dict[str, Any]) -> str:
        result = self._col(name).insert_one(doc)
        return str(result.inserted_id)

    def list(self, name: str, flt: dict[str, Any] | None, limit: int) -> list[dict[str, Any]]:
        return list(self._col(name).find(flt or {}, limit=limit))

    def get(self, name: str, doc_id: str) -> dict[str, Any] | None:
        return self._col(name).find_one({"_id": doc_id})

    def upsert(self, name: str, doc_id: str, doc: dict[str, Any]) -> None:
        self._col(name).replace_one({"_id": doc_id}, {**doc, "_id": doc_id}, upsert=True)

    def delete(self, name: str, doc_id: str) -> bool:
        return self._col(name).delete_one({"_id": doc_id}).deleted_count > 0

    def claim_post_notification(self, slug: str) -> dict[str, Any] | None:
        doc = self._col("posts").find_one_and_update(
            {
                "$or": [{"slug": slug}, {"_id": slug}],
                "status": "published",
                "notified": {"$ne": True},
                "notifyState": {"$ne": "sending"},
            },
            {"$set": {"notifyState": "sending"}},
            return_document=True,
        )
        if doc and not is_post_due(doc):
            self._col("posts").update_one({"_id": doc["_id"]}, {"$set": {"notifyState": "pending"}})
            return None
        return doc

    def set_post_notification(self, slug: str, fields: dict[str, Any]) -> bool:
        result = self._col("posts").update_one(
            {"$or": [{"slug": slug}, {"_id": slug}]}, {"$set": fields}
        )
        return result.matched_count > 0

    def mark_published_posts_notified(self, notified_at: str) -> int:
        updated = 0
        for doc in self._col("posts").find({"status": "published", "notified": {"$ne": True}}):
            if not is_post_due(doc):
                continue
            self._col("posts").update_one({"_id": doc["_id"]}, {"$set": {"notified": True, "notifiedAt": notified_at, "notifyState": "sent"}})
            updated += 1
        return updated


@lru_cache(maxsize=1)
def get_store() -> MemoryStore | AstraStore:
    if settings.dev_memory_db:
        return MemoryStore()
    if not (settings.astra_endpoint and settings.astra_token):
        from fastapi import HTTPException

        raise HTTPException(status_code=503, detail="Database is not configured.")
    return AstraStore()


def ensure_collection(name: str) -> None:
    if name not in CONTENT_COLLECTIONS and name not in DATA_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection.")
