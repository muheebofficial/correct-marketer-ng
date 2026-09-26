"""
Admin routes — every endpoint here requires a valid X-Admin-Key header
matching ADMIN_API_KEY. Used for managing content (posts, case studies,
services, etc.) and viewing captured leads/subscribers.
"""
from typing import Any

from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel

from ..config import settings, CONTENT_COLLECTIONS, DATA_COLLECTIONS
from ..db import get_database

router = APIRouter(prefix="/admin", tags=["admin"])


def _check_admin(x_admin_key: str | None):
    if not settings.admin_key or x_admin_key != settings.admin_key:
        raise HTTPException(status_code=401, detail="Invalid or missing X-Admin-Key")


class ContentIn(BaseModel):
    slug: str
    data: dict[str, Any] = {}


@router.get("/{collection}")
def list_any(collection: str, limit: int = 50, x_admin_key: str | None = Header(default=None)):
    _check_admin(x_admin_key)
    if collection not in CONTENT_COLLECTIONS + DATA_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    db = get_database()
    return db.get_collection(collection).find({}, limit=limit)


@router.post("/content/{collection}", status_code=201)
def create_content(
    collection: str, item: ContentIn, x_admin_key: str | None = Header(default=None)
):
    _check_admin(x_admin_key)
    if collection not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    db = get_database()
    doc = {"slug": item.slug, **item.data}
    result = db.get_collection(collection).insert_one(doc)
    return {"id": result.inserted_id, "slug": item.slug}