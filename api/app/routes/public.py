"""Endpoints called by the Next.js server: lead capture, newsletter, published content."""
from __future__ import annotations

import json
import urllib.request
from datetime import datetime, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request

from ..config import CONTENT_COLLECTIONS, settings
from ..models import LeadIn, NewsletterIn
from ..security import client_ip, limiter, require_web_secret
from ..store import get_store

router = APIRouter(prefix="/v1", dependencies=[Depends(require_web_secret)])


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _notify(payload: dict) -> None:
    """Fire-and-forget webhook (n8n / Zapier / Slack). Failures never affect the visitor."""
    if not settings.lead_webhook_url:
        return
    try:
        req = urllib.request.Request(
            settings.lead_webhook_url,
            data=json.dumps(payload, default=str).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        urllib.request.urlopen(req, timeout=8)  # noqa: S310 - URL comes from our own env
    except Exception:  # noqa: BLE001
        pass


@router.post("/leads", status_code=201)
def create_lead(lead: LeadIn, request: Request, background: BackgroundTasks):
    ip = client_ip(request)
    limiter.check("lead", ip, limit=5, window_seconds=600)

    if lead.fax:  # honeypot tripped: pretend success, store nothing
        return {"ok": True}

    doc = lead.model_dump()
    doc.pop("fax", None)
    doc["created_at"] = _now()
    doc["status"] = "new"
    lead_id = get_store().insert("leads", doc)
    background.add_task(_notify, {"type": "lead", "id": lead_id, **doc})
    return {"ok": True, "id": lead_id}


@router.post("/newsletter", status_code=201)
def subscribe(sub: NewsletterIn, request: Request):
    limiter.check("newsletter", client_ip(request), limit=5, window_seconds=600)
    if sub.fax:
        return {"ok": True}

    store = get_store()
    email = sub.email.lower()
    # One record per email address; re-subscribing just refreshes the record.
    store.upsert(
        "subscribers",
        email,
        {
            "first_name": sub.first_name,
            "email": email,
            "consent": True,
            "attribution": sub.attribution.model_dump(),
            "subscribed_at": _now(),
        },
    )
    return {"ok": True}


@router.get("/content/{collection}")
def list_published(collection: str, limit: int = 200):
    if collection not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection.")
    docs = get_store().list(collection, {"status": "published"}, min(max(limit, 1), 500))
    return {"items": [_public(d) for d in docs]}


@router.get("/content/{collection}/{slug}")
def get_published(collection: str, slug: str):
    if collection not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection.")
    doc = get_store().get(collection, slug)
    if not doc or doc.get("status") != "published":
        raise HTTPException(status_code=404, detail="Not found.")
    return _public(doc)


def _public(doc: dict) -> dict:
    out = dict(doc)
    out["slug"] = out.pop("_id", out.get("slug"))
    return out
