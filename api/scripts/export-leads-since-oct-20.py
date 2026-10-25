"""Print a CSV of Astra leads created since 2026-10-20 for the website leads tab.

Run from the api directory:
    python scripts/export-leads-since-oct-20.py

This script only reads from Astra DB. It does not write to any collection.
"""
from __future__ import annotations

import csv
import hashlib
import json
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.store import AstraStore, get_store

CUTOFF = datetime(2026, 10, 20, tzinfo=ZoneInfo("Africa/Lagos")).astimezone(timezone.utc)
LIMIT = 1000
HEADERS = [
    "Lead ID", "Name", "First name", "Last name", "Email", "Phone",
    "Form source", "Page", "Submitted", "Lead status", "Consent", "Owner",
    "Business", "Website", "Business type", "Challenge", "Budget",
    "Preferred contact", "Message", "Attribution",
]
ATTRIBUTION_KEYS = (
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "landing_page", "referrer",
)
PHONE_PREFIXES = ("+234", "+233", "+254", "+27", "+44", "+971", "+1")


def _value(doc: dict[str, Any], *keys: str, default: Any = "") -> Any:
    for key in keys:
        if doc.get(key) is not None:
            return doc[key]
    return default


def _timestamp(value: Any) -> datetime | None:
    if isinstance(value, datetime):
        result = value
    elif isinstance(value, (int, float)):
        result = datetime.fromtimestamp(value, tz=timezone.utc)
    elif isinstance(value, str):
        text = value.strip()
        if not text:
            return None
        if text.endswith("Z"):
            text = text[:-1] + "+00:00"
        try:
            result = datetime.fromisoformat(text)
        except ValueError:
            return None
    else:
        return None
    if result.tzinfo is None:
        result = result.replace(tzinfo=timezone.utc)
    return result.astimezone(timezone.utc)


def _phone(value: Any) -> str:
    phone = "".join(char for char in str(value or "") if char.isdigit() or char == "+")
    if phone.startswith("00"):
        phone = "+" + phone[2:]
    elif phone.startswith("0"):
        phone = "+234" + phone[1:]
    elif phone and not phone.startswith("+"):
        phone = "+" + phone
    return phone if any(phone.startswith(prefix) for prefix in PHONE_PREFIXES) else ""


def _attribution(value: Any) -> str:
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except json.JSONDecodeError:
            value = {}
    data = value if isinstance(value, dict) else {}
    return json.dumps(
        {key: data.get(key, "") for key in ATTRIBUTION_KEYS},
        ensure_ascii=False,
        separators=(",", ":"),
    )


def _row(doc: dict[str, Any], submitted: datetime) -> dict[str, Any]:
    full_name = str(_value(doc, "name", "Name"))
    first_name = str(_value(doc, "first_name", "firstName"))
    last_name = str(_value(doc, "last_name", "lastName"))
    if not first_name and full_name:
        name_parts = full_name.split(maxsplit=1)
        first_name = name_parts[0]
        if len(name_parts) > 1 and not last_name:
            last_name = name_parts[1]
    name = f"{first_name} {last_name}".strip() or full_name.strip()

    created_id = str(doc.get("_id", ""))
    stable_id = (
        uuid.UUID(bytes=hashlib.sha256(created_id.encode("utf-8")).digest()[:16], version=4)
        if created_id
        else uuid.uuid4()
    )
    lagos_time = submitted.astimezone(ZoneInfo("Africa/Lagos")).strftime("%Y-%m-%d %H:%M")
    return {
        "Lead ID": str(stable_id),
        "Name": name,
        "First name": first_name,
        "Last name": last_name,
        "Email": str(_value(doc, "email", "Email")).lower(),
        "Phone": _phone(_value(doc, "phone", "Phone")),
        "Form source": str(_value(doc, "source", "intent", default="website")),
        "Page": str(_value(doc, "page", "Page")),
        "Submitted": lagos_time,
        "Lead status": str(_value(doc, "lead_status", "status", default="New")),
        "Consent": bool(_value(doc, "consent", default=False)),
        "Owner": str(_value(doc, "owner", default="Muheeb Sulaiman")),
        "Business": str(_value(doc, "business", "Business")),
        "Website": str(_value(doc, "website", "Website")),
        "Business type": str(_value(doc, "business_type", "businessType")),
        "Challenge": str(_value(doc, "challenge", "Challenge")),
        "Budget": str(_value(doc, "budget", "Budget")),
        "Preferred contact": str(_value(doc, "preferred_contact", "preferredContact")),
        "Message": str(_value(doc, "message", "Message")),
        "Attribution": _attribution(_value(doc, "attribution", "Attribution", default={})),
    }


def main() -> int:
    store = get_store()
    if not isinstance(store, AstraStore):
        print("Refusing to export: configure Astra DB and set DEV_MEMORY_DB=0.", file=sys.stderr)
        return 1

    if "leads" not in store._db.list_collection_names():
        print("The Astra leads collection does not exist.", file=sys.stderr)
        return 1

    collection = store._db.get_collection("leads")
    leads = list(collection.find({}, limit=LIMIT))
    if len(leads) == LIMIT:
        print(f"Refusing to export: the {LIMIT}-record read limit was reached.", file=sys.stderr)
        return 1

    rows = []
    for lead in leads:
        created = _timestamp(_value(lead, "created_at", "createdAt", "submittedAt"))
        if created and created >= CUTOFF:
            rows.append(_row(lead, created))

    writer = csv.DictWriter(sys.stdout, fieldnames=HEADERS, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(rows)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
