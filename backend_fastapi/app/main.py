"""FastAPI application entrypoint.

Replaces the Django ``petpal`` project. Routers preserve the exact URL paths
(including trailing slashes) the React frontend already calls.
"""
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import CORS_ALLOWED_ORIGINS, MEDIA_ROOT, MEDIA_URL
from .errors import http_exception_handler, validation_exception_handler
from .routers import (
    accounts,
    applications,
    auth,
    blogs,
    comments,
    currentuser,
    notification,
    petlisting,
)

# Schema is managed by Alembic: run `alembic upgrade head` before serving.
# redirect_slashes=False so we normalize in-process instead of 307-redirecting
# (browser redirects drop the Authorization header on auth'd requests).
app = FastAPI(title="PetPal API", redirect_slashes=False)


@app.middleware("http")
async def append_trailing_slash(request: Request, call_next):
    """The frontend calls some routes without a trailing slash (e.g. /blogs?...).

    Django used APPEND_SLASH; we mirror that by adding a trailing slash to the
    path in-process (preserving method, body and headers) so routes match.
    """
    path = request.scope["path"]
    if not path.endswith("/") and not path.startswith(MEDIA_URL) and path != "/":
        # Only rewrite if the last segment isn't a filename (has no dot).
        last = path.rsplit("/", 1)[-1]
        if "." not in last:
            request.scope["path"] = path + "/"
    return await call_next(request)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DRF-compatible error shapes for the existing frontend.
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)

app.include_router(auth.router)
app.include_router(accounts.router)
app.include_router(applications.router)
app.include_router(petlisting.router)
app.include_router(notification.router)
app.include_router(currentuser.router)
app.include_router(blogs.router)
app.include_router(comments.router)

# Serve uploaded media at /media (Django's MEDIA_URL).
app.mount(MEDIA_URL, StaticFiles(directory=MEDIA_ROOT), name="media")


@app.get("/")
def health():
    return {"status": "ok"}
