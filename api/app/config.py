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
        o.strip() for o in os.getenv("WEB_ORIGINS", "http://localhost:3000").split("https://correctmarketer.com.ng,https://www.correctmarketer.com.ng") if o.strip()
    )
    lead_webhook_url: str = os.getenv("LEAD_WEBHOOK_URL", "")


settings = Settings()


def validate_settings(cfg: Settings | None = None) -> list[str]:
    """Return a list of configuration problems for the API."""
    cfg = cfg or settings
    errors: list[str] = []

    if not cfg.shared_secret:
        errors.append("API_SHARED_SECRET is required. Set it in api/.env before starting the API.")
    if not cfg.admin_key:
        errors.append("ADMIN_API_KEY is required. Set it in api/.env before starting the API.")

    if cfg.dev_memory_db:
        return errors

    if not cfg.astra_endpoint:
        errors.append("ASTRA_DB_API_ENDPOINT is required when DEV_MEMORY_DB=0.")
    if not cfg.astra_token:
        errors.append("ASTRA_DB_APPLICATION_TOKEN is required when DEV_MEMORY_DB=0.")

    return errors


def require_valid_settings() -> None:
    """Fail fast during startup when required config is missing."""
    errors = validate_settings()
    if errors:
        raise RuntimeError("Invalid API configuration:\n- " + "\n- ".join(errors))


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
