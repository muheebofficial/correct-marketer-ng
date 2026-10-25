"""Endpoints called by the Next.js server: lead capture, newsletter, published content."""
from __future__ import annotations

import asyncio
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from uuid import uuid4
from zoneinfo import ZoneInfo

from fastapi import APIRouter, Depends, HTTPException, Request

from ..config import CONTENT_COLLECTIONS, settings
from ..lead_sink import submit_lead_to_sheet
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
    """Send the existing lead notification webhook before responding."""
    if not settings.lead_webhook_url:
        return
    try:
        req = urllib.request.Request(
            settings.lead_webhook_url,
            data=json.dumps(payload, default=str).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        # Website API lead form: deliver the existing notification and auto-reply payload.
        with urllib.request.urlopen(req, timeout=8):  # noqa: S310 - URL comes from our own env
            return
    except (urllib.error.URLError, TimeoutError, OSError):
        print("Lead notification webhook failed.", file=sys.stderr)


def _insert_lead(doc: dict) -> str:
    return get_store().insert("leads", doc)


def _website_sheet_lead(lead: LeadIn, lead_id: str) -> dict:
    name = lead.name.strip()
    name_parts = name.split(maxsplit=1)
    first_name = name_parts[0] if name_parts else ""
    last_name = name_parts[1] if len(name_parts) > 1 else ""
    phone = "".join(character for character in lead.phone if character.isdigit() or character == "+")
    if phone.startswith("00"):
        phone = "+" + phone[2:]
    elif phone.startswith("0"):
        phone = "+234" + phone[1:]
    elif phone and not phone.startswith("+"):
        phone = "+" + phone
    if not any(phone.startswith(prefix) for prefix in ("+234", "+233", "+254", "+27", "+44", "+971", "+1")):
        phone = ""

    now = datetime.now(ZoneInfo("Africa/Lagos")).strftime("%Y-%m-%d %H:%M")
    attribution = lead.attribution.model_dump()
    return {
        "Lead ID": lead_id,
        "Name": f"{first_name} {last_name}".strip(),
        "First name": first_name,
        "Last name": last_name,
        "Email": str(lead.email),
        "Phone": phone,
        "Form source": lead.source if lead.source != "website_form" else lead.intent,
        "Page": lead.page,
        "Submitted": now,
        "Lead status": "New",
        "Consent": lead.consent,
        "Owner": "Muheeb Sulaiman",
        "Business": lead.business,
        "Website": lead.website,
        "Business type": lead.business_type,
        "Challenge": lead.challenge,
        "Budget": lead.budget,
        "Preferred contact": lead.preferred_contact,
        "Message": lead.message,
        "Attribution": json.dumps(attribution, ensure_ascii=False, separators=(",", ":")),
    }


def _send_sheet_failure_alert(lead: dict) -> None:
    api_key = os.getenv("RESEND_API_KEY", "")
    from_email = os.getenv("FROM_EMAIL", "")
    notify_email = os.getenv("NOTIFY_EMAIL", "")
    if not api_key or not from_email or not notify_email:
        print("Lead sheet failure alert not sent: email configuration missing.", file=sys.stderr)
        return
    body = {
        "from": f"Muheeb Sulaiman <{from_email}>",
        "to": [notify_email],
        "subject": "Lead not saved to sheet",
        "text": "A website lead could not be saved to Google Sheets.\n\nSubmitted fields:\n"
        + json.dumps(lead, ensure_ascii=False, indent=2),
    }
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        # Website API lead form: send a plain owner alert if the sheet write failed.
        with urllib.request.urlopen(req, timeout=10):
            return
    except (urllib.error.URLError, TimeoutError, OSError):
        print("Lead sheet failure alert email failed.", file=sys.stderr)


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
async def create_lead(lead: LeadIn, request: Request):
    ip = client_ip(request)
    limiter.check("lead", ip, limit=5, window_seconds=600)

    if lead.fax:  # honeypot tripped: pretend success, store nothing
        return {"ok": True, "stage": "new_lead"}

    lead_id = str(uuid4())
    doc = lead.model_dump()
    doc.pop("fax", None)
    doc["source"] = lead.source if lead.source != "website_form" else lead.intent
    doc["stage"] = "new_lead"
    doc["owner"] = "Muheeb"
    doc["contact_channel_preference"] = lead.preferred_contact or ("whatsapp" if lead.phone else "email")
    doc["notes"] = []
    doc["lost_reason"] = None
    doc["onboarding_checklist"] = _default_onboarding_checklist()
    doc["stage_updated_at"] = _now()
    doc["created_at"] = _now()
    doc["lead_id"] = lead_id
    doc.pop("status", None)

    sheet_lead = _website_sheet_lead(lead, lead_id)
    results = await asyncio.gather(
        asyncio.to_thread(submit_lead_to_sheet, "website_leads", sheet_lead),
        asyncio.to_thread(_insert_lead, doc),
        asyncio.to_thread(
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
        ),
        return_exceptions=True,
    )
    sheet_result, astra_id, notification_result = results
    sheet_saved = isinstance(sheet_result, dict) and sheet_result.get("ok") is True
    if not sheet_saved:
        await asyncio.to_thread(_send_sheet_failure_alert, sheet_lead)
    if isinstance(astra_id, BaseException):
        print("Astra lead write failed.", file=sys.stderr)
        astra_id = None
    if isinstance(notification_result, BaseException):
        print("Lead notification webhook failed.", file=sys.stderr)
    return {"ok": True, "id": astra_id, "stage": doc["stage"], "saved": sheet_saved}


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
