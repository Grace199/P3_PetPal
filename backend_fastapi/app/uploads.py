"""Saving uploaded images to MEDIA_ROOT, mirroring Django's ImageField."""
import uuid
from pathlib import Path

from fastapi import UploadFile

from .config import MEDIA_ROOT


def save_upload(upload: UploadFile, subdir: str = "avatars") -> str:
    """Persist an upload and return its media-relative path (e.g. avatars/x.jpg)."""
    suffix = Path(upload.filename or "").suffix or ".jpg"
    name = f"{uuid.uuid4().hex}{suffix}"
    dest_dir = MEDIA_ROOT / subdir
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / name
    with dest.open("wb") as f:
        f.write(upload.file.read())
    return f"{subdir}/{name}"
