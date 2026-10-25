"""Server-side Google Sheets webhook client for lead submissions."""
from __future__ import annotations

import json
import sys
import time
import urllib.error
import urllib.request
from typing import Any, Literal

from .config import settings

LeadSheet = Literal["website_leads", "ebook_leads"]


def _post(sheet: LeadSheet, lead: dict[str, Any]) -> tuple[bool, bool, str]:
    if not settings.google_sheets_webhook_url or not settings.google_sheets_webhook_secret:
        return False, False, "missing_env"

    request = urllib.request.Request(
        settings.google_sheets_webhook_url,
        data=json.dumps({
            "secret": settings.google_sheets_webhook_secret,
            "sheet": sheet,
            "lead": lead,
        }).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            status = response.status
            body = response.read()
    except urllib.error.HTTPError as error:
        status = error.code
        try:
            body = error.read()
        except OSError:
            body = b""
    except (urllib.error.URLError, TimeoutError, OSError):
        return False, True, "network_error"

    if status >= 500:
        return False, True, f"http_{status}"

    try:
        payload = json.loads(body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return False, True, "non_json"
    if not isinstance(payload, dict) or "ok" not in payload:
        return False, True, "non_json"
    if status < 200 or status >= 300:
        return False, False, f"http_{status}"
    if payload.get("ok") is True:
        return True, False, "saved"
    return False, False, "webhook_rejected"


def submit_lead_to_sheet(sheet: LeadSheet, lead: dict[str, Any]) -> dict[str, bool]:
    """Post one lead, retrying transient failures once; never raises."""
    lead_id = str(lead.get("Lead ID", "missing_id"))
    if sheet not in ("website_leads", "ebook_leads"):
        print(f"[lead-sink] {sheet} {lead_id} failed invalid_sheet", file=sys.stderr)
        return {"ok": False}

    try:
        ok, retry, reason = _post(sheet, lead)
        if not ok and retry:
            time.sleep(1)
            ok, _, reason = _post(sheet, lead)
    except Exception:
        ok, reason = False, "network_error"

    print(
        f"[lead-sink] {sheet} {lead_id} {'ok' if ok else 'failed'} {reason}",
        file=sys.stderr,
    )
    return {"ok": ok}
