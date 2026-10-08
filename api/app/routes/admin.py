"""Content management + lead inbox. Protected by X-Admin-Key. Explore interactively at /docs."""
from __future__ import annotations

import json
import logging
import urllib.request
from datetime import datetime, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from pydantic import BaseModel, Field

from ..config import CONTENT_COLLECTIONS, settings
from ..models import ContentDoc
from ..security import require_admin
from ..store import get_store

router = APIRouter(prefix="/v1/admin", dependencies=[Depends(require_admin)], tags=["admin"])
logger = logging.getLogger(__name__)


class StageUpdate(BaseModel):
    stage: str = Field(min_length=1, max_length=80)
    owner: str | None = Field(default=None, max_length=200)


class NoteCreate(BaseModel):
    text: str = Field(min_length=1, max_length=2000)
    author: str = Field(default="Muheeb", max_length=200)


class ChecklistToggle(BaseModel):
    status: str = Field(default="done", pattern="^(pending|done)$")
    completed_by: str = Field(default="Muheeb", max_length=200)


class LostLead(BaseModel):
    lost_reason: str = Field(min_length=1, max_length=500)


def _check(collection: str) -> None:
    if collection not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection.")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _lead_by_id(lead_id: str):
    lead = get_store().get("leads", lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")
    return lead


def _trigger_post_notification(slug: str) -> None:
    if not settings.site_url or not settings.notify_secret:
        logger.warning("Post notification hook is not configured for slug %s", slug)
        return
    request = urllib.request.Request(
        f"{settings.site_url}/api/notify/post-published",
        data=json.dumps({"slug": slug}).encode(),
        headers={
            "Content-Type": "application/json",
            "x-notify-secret": settings.notify_secret,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=10):  # noqa: S310 - configured site URL
            pass
    except Exception:  # noqa: BLE001
        logger.exception("Post notification hook failed for slug %s", slug)


@router.get("/stages")
def stages():
    return {"items": list(settings.lead_pipeline_stages)}


@router.get("/content/{collection}")
def list_all(collection: str, limit: int = 200):
    """Every document in a collection, drafts included."""
    _check(collection)
    docs = get_store().list(collection, None, min(max(limit, 1), 500))
    return {"items": docs}


@router.put("/content/{collection}/{slug}")
def upsert(collection: str, slug: str, doc: ContentDoc, background: BackgroundTasks):
    """Create or replace a document. `slug` becomes its URL slug. Set status to `published` to make it live."""
    _check(collection)
    store = get_store()
    previous = store.get(collection, slug)
    body = doc.model_dump()
    body["slug"] = slug
    body["updated_at"] = _now()
    store.upsert(collection, slug, body)
    if collection == "posts" and body.get("status") == "published" and (
        not previous or previous.get("status") != "published"
    ):
        background.add_task(_trigger_post_notification, slug)
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


@router.get("/leads/{lead_id}")
def lead_detail(lead_id: str):
    return _lead_by_id(lead_id)


@router.patch("/leads/{lead_id}/stage")
def update_stage(lead_id: str, payload: StageUpdate):
    lead = _lead_by_id(lead_id)
    if payload.stage not in settings.lead_pipeline_stages:
        raise HTTPException(status_code=400, detail="Unknown pipeline stage.")
    lead["stage"] = payload.stage
    lead["stage_updated_at"] = _now()
    if payload.owner:
        lead["owner"] = payload.owner
    get_store().upsert("leads", lead_id, lead)
    return {"ok": True, "stage": lead["stage"]}


@router.post("/leads/{lead_id}/notes")
def add_note(lead_id: str, payload: NoteCreate):
    lead = _lead_by_id(lead_id)
    note = {"text": payload.text, "author": payload.author, "created_at": _now()}
    lead.setdefault("notes", []).append(note)
    lead["stage_updated_at"] = _now()
    get_store().upsert("leads", lead_id, lead)
    return {"ok": True, "note": note}


@router.patch("/leads/{lead_id}/checklist/{item_label}")
def toggle_checklist(lead_id: str, item_label: str, payload: ChecklistToggle):
    lead = _lead_by_id(lead_id)
    checklist = lead.setdefault("onboarding_checklist", [])
    item = next((i for i in checklist if i.get("label") == item_label), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Checklist item not found.")
    item["status"] = payload.status
    item["completed_by"] = payload.completed_by
    item["completed_at"] = _now() if payload.status == "done" else ""
    lead["stage_updated_at"] = _now()
    get_store().upsert("leads", lead_id, lead)
    return {"ok": True, "item": item}


@router.patch("/leads/{lead_id}/lost")
def mark_lost(lead_id: str, payload: LostLead):
    lead = _lead_by_id(lead_id)
    lead["stage"] = "lost"
    lead["lost_reason"] = payload.lost_reason
    lead["stage_updated_at"] = _now()
    get_store().upsert("leads", lead_id, lead)
    return {"ok": True, "stage": lead["stage"]}
