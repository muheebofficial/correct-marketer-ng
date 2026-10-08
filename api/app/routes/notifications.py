"""Private post notification operations used by the Next.js server."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from ..security import require_web_secret
from ..store import get_store

router = APIRouter(
    prefix="/v1/notifications",
    dependencies=[Depends(require_web_secret)],
    tags=["notifications"],
)


class NotificationStatus(BaseModel):
    state: Literal["sent", "pending"]


def _public(doc: dict) -> dict:
    result = dict(doc)
    slug = result.get("slug", result.get("_id"))
    result.pop("_id", None)
    result["slug"] = slug
    return result


@router.get("/posts")
def pending_posts(limit: int = 500):
    docs = get_store().list("posts", {"status": "published"}, min(max(limit, 1), 500))
    return {"items": [_public(doc) for doc in docs if doc.get("notified") is not True]}


@router.post("/posts/mark-notified")
def mark_existing_posts_notified():
    store = get_store()
    notified_at = datetime.now(timezone.utc).isoformat()
    updated = store.mark_published_posts_notified(notified_at)
    return {"updated": updated}


@router.post("/posts/{slug}/claim")
def claim_post(slug: str):
    doc = get_store().claim_post_notification(slug)
    return {"post": _public(doc) if doc else None}


@router.patch("/posts/{slug}")
def update_post_notification(slug: str, payload: NotificationStatus):
    fields: dict[str, object] = {"notifyState": payload.state}
    if payload.state == "sent":
        fields.update(
            {
                "notified": True,
                "notifiedAt": datetime.now(timezone.utc).isoformat(),
            }
        )
    if not get_store().set_post_notification(slug, fields):
        raise HTTPException(status_code=404, detail="Post not found.")
    return {"ok": True}