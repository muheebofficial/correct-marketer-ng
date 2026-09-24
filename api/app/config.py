"""Environment-driven settings. Nothing secret is ever hard-coded."""
import os
from dataclasses import dataclass


def _bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "on"}


@dataclass(frozen=True)
class Settings:
    astra_endpoint: str = os.getenv("ASTRA_DB_API_ENDPOINT", "")
    astra_token: str = os.getenv("ASTRA_DB_APPLICATION_TOKEN", "")
    dev_memory_db: bool = _bool(os.getenv("DEV_MEMORY_DB", "0"))
    shared_secret: str = os.getenv("API_SHARED_SECRET", "")
    admin_key: str = os.getenv("ADMIN_API_KEY", "")
    web_origins: tuple = tuple(
        o.strip() for o in os.getenv("WEB_ORIGINS", "http://localhost:3000").split(",") if o.strip()
    )
    lead_webhook_url: str = os.getenv("LEAD_WEBHOOK_URL", "")


settings = Settings()

# Collections the API is allowed to read/write. Anything else is rejected.
CONTENT_COLLECTIONS = (
    "posts",
    "case_studies",
    "services",
    "industries",
    "faqs",
    "testimonials",
    "authors",
    "lead_magnets",
)
DATA_COLLECTIONS = ("leads", "subscribers")
