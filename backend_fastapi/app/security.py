"""Password hashing and JWT helpers.

The JWT payload is kept compatible with DRF SimpleJWT: it carries a
``user_id`` claim plus ``exp``/``iat``, and a ``token_type`` of
"access" or "refresh".
"""
from datetime import datetime, timezone

import bcrypt
from jose import JWTError, jwt

from .config import (
    ACCESS_TOKEN_LIFETIME,
    ALGORITHM,
    REFRESH_TOKEN_LIFETIME,
    SECRET_KEY,
)

# Use the bcrypt library directly (passlib 1.7.x is incompatible with
# bcrypt 5.x). bcrypt ignores bytes past 72, so we truncate to match.
def _to_bytes(raw: str) -> bytes:
    return raw.encode("utf-8")[:72]


def hash_password(raw: str) -> str:
    return bcrypt.hashpw(_to_bytes(raw), bcrypt.gensalt()).decode("utf-8")


def verify_password(raw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(_to_bytes(raw), hashed.encode("utf-8"))
    except (ValueError, TypeError):
        return False


def _create_token(user_id: int, token_type: str, lifetime) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "user_id": user_id,
        "token_type": token_type,
        "iat": now,
        "exp": now + lifetime,
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(user_id: int) -> str:
    return _create_token(user_id, "access", ACCESS_TOKEN_LIFETIME)


def create_refresh_token(user_id: int) -> str:
    return _create_token(user_id, "refresh", REFRESH_TOKEN_LIFETIME)


def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
