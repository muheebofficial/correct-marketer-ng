from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import require_valid_settings, settings
from .routes import admin, public

require_valid_settings()

app = FastAPI(
    title="Correct Marketer NG API",
    version="1.0.0",
    description="Lead capture, newsletter and content API for correctmarketer.com.ng (Astra DB).",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.web_origins),
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "X-Api-Secret", "X-Admin-Key", "X-Client-IP"],
)

app.include_router(public.router)
app.include_router(admin.router)


@app.get("/health", tags=["meta"])
def health():
    return {"status": "ok"}
