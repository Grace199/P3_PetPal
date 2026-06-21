"""DRF PageNumberPagination-compatible helper.

Django used PageNumberPagination with PAGE_SIZE=20, so list endpoints returned
``{"count", "next", "previous", "results"}``. The frontend relies on that
shape (``data.results``, ``data.count`` and ``count / 20`` page math), so we
reproduce it here.
"""
from typing import Sequence

from fastapi import Request
from pydantic import BaseModel

PAGE_SIZE = 20


def paginate_serialized(
    items: Sequence, schema: type[BaseModel], request: Request
) -> dict:
    """Paginate ORM rows and serialize each page item through ``schema``."""
    result = paginate(items, request)
    result["results"] = [
        schema.model_validate(item).model_dump(mode="json", by_alias=True)
        for item in result["results"]
    ]
    return result


def paginate(items: Sequence, request: Request) -> dict:
    try:
        page = int(request.query_params.get("page", 1))
    except (TypeError, ValueError):
        page = 1
    if page < 1:
        page = 1

    count = len(items)
    start = (page - 1) * PAGE_SIZE
    end = start + PAGE_SIZE
    results = list(items[start:end])

    def page_url(p: int) -> str:
        params = dict(request.query_params)
        params["page"] = str(p)
        query = "&".join(f"{k}={v}" for k, v in params.items())
        return f"{request.url.scheme}://{request.url.netloc}{request.url.path}?{query}"

    has_next = end < count
    has_prev = start > 0
    return {
        "count": count,
        "next": page_url(page + 1) if has_next else None,
        "previous": page_url(page - 1) if has_prev else None,
        "results": results,
    }
