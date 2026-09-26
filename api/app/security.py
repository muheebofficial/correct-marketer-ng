"""Shared-secret and admin-key checks, plus a small in-memory rate limiter."""
from __future__ import annotations

import hmac
import logging
import time
from collections import defaultdict, deque

from fastapi import Header, HTTPException, Request

from .config import settings

logger = logging.getLogger("correct_marketer.security")


def _safe_equal(a: str, b: str) -> bool:
    return bool(a) and bool(b) and hmac.compare_digest(a.encode(), b.encode())


def require_web_secret(x_api_secret: str = Header(default="")) -> None:
    """Only the Next.js server (which knows API_SHARED_SECRET) may call public endpoints."""
    if not _safe_equal(x_api_secret, settings.shared_secret):
        logger.warning("Rejected request with invalid X-Api-Secret.")
        raise HTTPException(status_code=401, detail="Unauthorized.")


def require_admin(x_admin_key: str = Header(default="")) -> None:
    if not _safe_equal(x_admin_key, settings.admin_key):
        logger.warning("Rejected admin request with invalid X-Admin-Key.")
        raise HTTPException(status_code=401, detail="Unauthorized.")


class RateLimiter:
    """Sliding-window limiter keyed by (bucket, client IP).

    In-memory, so it is per-process. If you run several API instances, back this with Redis.
    """

    def __init__(self) -> None:
        self._hits: dict[tuple[str, str], deque[float]] = defaultdict(deque)

    def check(self, bucket: str, ip: str, limit: int, window_seconds: int) -> None:
        now = time.monotonic()
        q = self._hits[(bucket, ip)]
        while q and now - q[0] > window_seconds:
            q.popleft()
        if len(q) >= limit:
            logger.warning("Rate limit exceeded for bucket=%s ip=%s limit=%s window_seconds=%s", bucket, ip, limit, window_seconds)
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please wait a few minutes and try again.",
            )
        q.append(now)


limiter = RateLimiter()


def client_ip(request: Request) -> str:
    """The Next.js server forwards the visitor IP in X-Client-IP (trusted because of the shared secret)."""
    forwarded = request.headers.get("x-client-ip")
    if forwarded and forwarded.strip():
        return forwarded.strip()
    return request.client.host if request.client else "unknown"
