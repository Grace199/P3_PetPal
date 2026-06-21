"""Expand DRF-style dotted multipart keys into nested dicts.

The frontend sends ``account.name``, ``account.avatar`` etc. in multipart
forms (as DRF's MultiPartParser expects). This rebuilds the nesting.
"""
from typing import Any

from starlette.datastructures import UploadFile


def nest_form(items: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in items:
        parts = key.split(".")
        cursor = result
        for part in parts[:-1]:
            cursor = cursor.setdefault(part, {})
        cursor[parts[-1]] = value
    return result


def is_upload(value: Any) -> bool:
    return isinstance(value, UploadFile)
