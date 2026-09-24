"""Content management + lead inbox. Protected by X-Admin-Key. Explore interactively at /docs."""
from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException

from ..config import CONTENT_COLLECTIONS
from ..models import ContentDoc
from ..security import require_admin
from ..store import get_store

router = APIRouter(prefix="/v1/admin", dependencies=[Depends(require_admin)], tags=["admin"])


def _check(collection: str) -> None:
    if collection not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection.")


@router.get("/content/{collection}")
def list_all(collection: str, limit: int = 200):
    """Every document in a collection, drafts included."""
    _check(collection)
    docs = get_store().list(collection, None, min(max(limit, 1), 500))
    return {"items": docs}


@router.put("/content/{collection}/{slug}")
def upsert(collection: str, slug: str, doc: ContentDoc):
    """Create or replace a document. `slug` becomes its URL slug. Set status to `published` to make it live."""
    _check(collection)
    body = doc.model_dump()
    body["updated_at"] = datetime.now(timezone.utc).isoformat()
    get_store().upsert(collection, slug, body)
    return {"ok": True, "slug": slug}


@router.delete("/content/{collection}/{slug}")
def remove(collection: str, slug: str):
    _check(collection)
    if not get_store().delete(collection, slug):
        raise HTTPException(status_code=404, detail="Not found.")
    return {"ok": True}


@router.get("/leads")
def leads(limit: int = 100):
    docs = get_store().list("leads", None, min(max(limit, 1), 500))
    docs.sort(key=lambda d: d.get("created_at", ""), reverse=True)
    return {"items": docs}
