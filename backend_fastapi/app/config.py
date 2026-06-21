"""Application configuration.

Values are read from environment variables in production (Render) and fall back
to local-dev defaults otherwise.
"""
import os
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY: override in production via env. Falls back to the old dev key.
SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "django-insecure-ov^c!zv(@h(ri+daa43#@6p1j#tvm-fm!c!6tjm#^6qiupl1&)",
)
ALGORITHM = "HS256"

ACCESS_TOKEN_LIFETIME = timedelta(days=1)
REFRESH_TOKEN_LIFETIME = timedelta(days=7)

# DATABASE_URL: Render injects a postgres:// URL; default to local SQLite.
# SQLAlchemy needs the "postgresql://" scheme (not "postgres://").
DATABASE_URL = os.environ.get("DATABASE_URL", f"sqlite:///{BASE_DIR / 'db.sqlite3'}")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

MEDIA_ROOT = Path(os.environ.get("MEDIA_ROOT", str(BASE_DIR / "media")))
MEDIA_URL = "/media"

# Public base URL of this backend (e.g. https://petpal-api.onrender.com).
# Used to build absolute media URLs the frontend can load directly.
PUBLIC_BACKEND_URL = os.environ.get("PUBLIC_BACKEND_URL", "http://localhost:8000")
MEDIA_BASE_URL = f"{PUBLIC_BACKEND_URL.rstrip('/')}/media/"

# CORS: comma-separated list of allowed frontend origins, or defaults for dev.
_cors_env = os.environ.get("CORS_ALLOWED_ORIGINS", "")
CORS_ALLOWED_ORIGINS = (
    [o.strip() for o in _cors_env.split(",") if o.strip()]
    if _cors_env
    else ["http://localhost:3000", "http://127.0.0.1:3000"]
)

DEFAULT_AVATAR = "avatars/default-avatar.jpg"

MEDIA_ROOT.mkdir(parents=True, exist_ok=True)
(MEDIA_ROOT / "avatars").mkdir(parents=True, exist_ok=True)
