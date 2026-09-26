"""Validated request models. All free-text is length-limited and stripped."""
from __future__ import annotations

import re
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator

PHONE_RE = re.compile(r"^\+?[0-9][0-9\s\-()]{6,18}$")


class Attribution(BaseModel):
    utm_source: str = Field(default="", max_length=200)
    utm_medium: str = Field(default="", max_length=200)
    utm_campaign: str = Field(default="", max_length=200)
    utm_content: str = Field(default="", max_length=200)
    utm_term: str = Field(default="", max_length=200)
    landing_page: str = Field(default="", max_length=500)
    referrer: str = Field(default="", max_length=500)


class LeadNote(BaseModel):
    text: str = Field(min_length=1, max_length=2000)
    author: str = Field(default="Muheeb", max_length=200)
    created_at: str = ""


class LeadChecklistItem(BaseModel):
    label: str = Field(min_length=1, max_length=200)
    status: Literal["pending", "done"] = "pending"
    completed_by: str = Field(default="", max_length=200)
    completed_at: str = ""


class LeadIn(BaseModel):
    intent: Literal[
        "contact",
        "growth-audit",
        "website-conversion-audit",
        "seo-visibility-audit",
        "ai-automation-assessment",
    ] = "contact"
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(description="Phone / WhatsApp number")
    business: str = Field(default="", max_length=150)
    website: str = Field(default="", max_length=300)
    business_type: str = Field(default="", max_length=80)
    challenge: str = Field(default="", max_length=80)
    budget: str = Field(default="", max_length=80)
    preferred_contact: Literal["whatsapp", "email", "phone", ""] = ""
    message: str = Field(default="", max_length=2000)
    consent: bool = False
    attribution: Attribution = Attribution()
    source: str = Field(default="website_form", max_length=200)
    stage: str = Field(default="new_lead", max_length=80)
    owner: str = Field(default="Muheeb", max_length=200)
    contact_channel_preference: Literal["whatsapp", "email", "phone", ""] = ""
    notes: list[LeadNote] = Field(default_factory=list)
    lost_reason: str | None = None
    onboarding_checklist: list[LeadChecklistItem] = Field(default_factory=list)
    stage_updated_at: str = ""
    created_at: str = ""
    # Honeypot: real people never see or fill this field.
    fax: str = Field(default="", max_length=200)

    @field_validator("name", "business", "website", "business_type", "challenge", "budget", "message", mode="before")
    @classmethod
    def _strip(cls, v):
        return v.strip() if isinstance(v, str) else v

    @field_validator("phone")
    @classmethod
    def _phone(cls, v: str) -> str:
        v = v.strip()
        if not PHONE_RE.match(v):
            raise ValueError("Enter a valid phone or WhatsApp number, e.g. 0803 000 0000 or +234 803 000 0000.")
        return v

    @field_validator("contact_channel_preference", mode="before")
    @classmethod
    def _contact_pref(cls, v):
        if v in (None, ""):
            return ""
        return str(v).strip().lower()


class NewsletterIn(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    consent: bool
    attribution: Attribution = Attribution()
    fax: str = Field(default="", max_length=200)

    @field_validator("first_name", mode="before")
    @classmethod
    def _strip(cls, v):
        return v.strip() if isinstance(v, str) else v

    @field_validator("consent")
    @classmethod
    def _must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Please tick the box so we know you're happy to receive emails.")
        return v


class ContentDoc(BaseModel):
    """CMS document. Extra fields are allowed so each collection can carry its own shape."""

    model_config = {"extra": "allow"}

    title: Optional[str] = Field(default=None, max_length=300)
    status: Literal["draft", "published"] = "draft"
