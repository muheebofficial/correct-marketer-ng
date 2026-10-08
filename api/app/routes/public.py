"""Endpoints called by the Next.js server: lead capture, newsletter, published content."""
from __future__ import annotations

import json
import urllib.request
from datetime import datetime, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request

from ..config import CONTENT_COLLECTIONS, settings
from ..models import LeadChecklistItem, LeadIn, NewsletterIn
from ..security import client_ip, limiter, require_web_secret
from ..store import get_store

router = APIRouter(prefix="/v1", dependencies=[Depends(require_web_secret)])

DEFAULT_ONBOARDING_CHECKLIST = [
    "Contract / agreement confirmed",
    "Deposit or payment received",
    "Brand assets collected (logo, brand guide, colors/fonts, existing content)",
    "Access collected (domain registrar, hosting, socials, analytics — as applicable)",
    "Kickoff call scheduled",
    "Scope document shared with client for sign-off",
    "Internal project record created (owner, timeline, milestones)",
    "Welcome message sent",
]


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _default_onboarding_checklist() -> list[dict]:
    return [
        {"label": label, "status": "pending", "completed_by": "", "completed_at": ""}
        for label in DEFAULT_ONBOARDING_CHECKLIST
    ]


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


def _lead_auto_reply_message(name: str, preferred_contact: str) -> str:
    channel = preferred_contact or "whatsapp"
    if channel == "email":
        return (
            f"Hi {name}, thanks for reaching out to Correct Marketer NG! We've received your details and Muheeb will follow "
            "up within 24 hours. In the meantime, feel free to reply here with more about what you're looking to achieve — "
            "We engineer your growth. 🚀"
        )
    return (
        f"Hi {name}, thanks for reaching out to Correct Marketer NG! We've received your details and Muheeb will follow up "
        "within 24 hours. In the meantime, feel free to reply here with more about what you're looking to achieve — "
        "We engineer your growth. 🚀"
    )


@router.post("/leads", status_code=201)
def create_lead(lead: LeadIn, request: Request, background: BackgroundTasks):
    ip = client_ip(request)
    limiter.check("lead", ip, limit=5, window_seconds=600)

    if lead.fax:  # honeypot tripped: pretend success, store nothing
        return {"ok": True, "stage": "new_lead"}

    doc = lead.model_dump()
    doc.pop("fax", None)
    doc["source"] = "website_form"
    doc["stage"] = "new_lead"
    doc["owner"] = "Muheeb"
    doc["contact_channel_preference"] = lead.preferred_contact or ("whatsapp" if lead.phone else "email")
    doc["notes"] = []
    doc["lost_reason"] = None
    doc["onboarding_checklist"] = _default_onboarding_checklist()
    doc["stage_updated_at"] = _now()
    doc["created_at"] = _now()
    doc.pop("status", None)

    lead_id = get_store().insert("leads", doc)
    background.add_task(
        _notify,
        {
            "type": "lead_created",
            "id": lead_id,
            "name": lead.name,
            "email": lead.email,
            "phone": lead.phone,
            "source": doc["source"],
            "stage": doc["stage"],
            "auto_reply": _lead_auto_reply_message(lead.name, doc["contact_channel_preference"]),
        },
    )
    return {"ok": True, "id": lead_id, "stage": doc["stage"]}


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
    slug = out.get("slug", out.get("_id"))
    out.pop("_id", None)
    out["slug"] = slug
    return out
