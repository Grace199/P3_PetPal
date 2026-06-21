"""Exception handlers that reshape errors into the DRF format the frontend expects.

DRF returned validation errors as a nested object keyed by field, e.g.::

    {"account": {"email": ["..."]}, "phone_number": ["..."]}

and other errors as ``{"detail": "..."}``. FastAPI's defaults differ, so we
translate here to keep the existing React error handling working unchanged.
"""
from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


def _set_nested(target: dict, path: list, message: str) -> None:
    """Place ``message`` (as a one-item list) at ``path`` inside ``target``."""
    cursor = target
    for key in path[:-1]:
        cursor = cursor.setdefault(key, {})
    leaf = path[-1]
    cursor.setdefault(leaf, []).append(message)


async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    errors: dict = {}
    for err in exc.errors():
        # loc looks like ("body", "account", "email"); drop the "body" prefix.
        loc = [str(p) for p in err["loc"] if p not in ("body", "query", "path")]
        if not loc:
            loc = ["non_field_errors"]
        _set_nested(errors, loc, err["msg"])
    return JSONResponse(status_code=400, content=errors)


async def http_exception_handler(
    request: Request, exc: HTTPException
) -> JSONResponse:
    # If a view raised HTTPException with a dict detail (field errors), return it
    # at the top level; otherwise keep DRF's {"detail": "..."} shape.
    if isinstance(exc.detail, dict):
        return JSONResponse(status_code=exc.status_code, content=exc.detail)
    return JSONResponse(
        status_code=exc.status_code, content={"detail": exc.detail}
    )
