"""
Public-facing routes — no admin key required.

Read access to whitelisted content collections, plus write access for lead
capture and newsletter signups. If API_SHARED_SECRET is set, POST requests
must include a matching X-Api-Secret header (checked by the frontend at
request time, e.g. a Vercel serverless function or Next.js API route that
holds the real secret server-side).
"""
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel, EmailStr

from ..config import settings, CONTENT_COLLECTIONS
from ..db import get_database

router = APIRouter(tags=["public"])


def _check_secret(x_api_secret: str | None):
    if settings.shared_secret and x_api_secret != settings.shared_secret:
        raise HTTPException(status_code=401, detail="Invalid or missing X-Api-Secret")


@router.get("/content/{collection}")
def list_content(collection: str, limit: int = 20):
    if collection not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    db = get_database()
    return db.get_collection(collection).find({}, limit=limit)


@router.get("/content/{collection}/{slug}")
def get_content_item(collection: str, slug: str):
    if collection not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    db = get_database()
    item = db.get_collection(collection).find_one({"slug": slug})
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    return item


class LeadIn(BaseModel):
    name: str
    phone: str
    email: EmailStr | None = None
    message: str
    source: str = "website"


@router.post("/leads", status_code=201)
def create_lead(lead: LeadIn, x_api_secret: str | None = Header(default=None)):
    _check_secret(x_api_secret)
    db = get_database()
    result = db.get_collection("leads").insert_one(lead.model_dump())
    return {"id": result.inserted_id, "status": "received"}


class SubscriberIn(BaseModel):
    email: EmailStr


@router.post("/subscribers", status_code=201)
def create_subscriber(sub: SubscriberIn, x_api_secret: str | None = Header(default=None)):
    _check_secret(x_api_secret)
    db = get_database()
    collection = db.get_collection("subscribers")
    if collection.find_one({"email": sub.email}):
        return {"status": "already_subscribed"}
    result = collection.insert_one(sub.model_dump())
    return {"id": result.inserted_id, "status": "subscribed"}