# PetPal — FastAPI backend

A 1:1 port of the original Django/DRF backend to FastAPI + SQLAlchemy + Alembic.
URL paths (including trailing slashes) and request/response shapes match the
old API exactly, so the existing React frontend works unchanged.

## Layout

```
app/
  main.py          FastAPI app: CORS, router includes, /media mount
  config.py        Secret key, JWT lifetimes, DB URL, media dirs
  db.py            SQLAlchemy engine, session, Base, get_db dependency
  security.py      bcrypt hashing + SimpleJWT-compatible access/refresh tokens
  deps.py          get_current_user / get_current_seeker / get_current_shelter
  models.py        SQLAlchemy models (mirrors the Django models)
  schemas.py       Pydantic schemas (mirrors the DRF serializers)
  formparse.py     Expands DRF-style dotted multipart keys (e.g. account.name)
  uploads.py       Saves uploaded images into MEDIA_ROOT
  notifications.py Notification side-effect helper
  routers/         One module per old Django app
alembic/           Migrations (initial schema committed)
tests/             End-to-end smoke test
```

## Setup

```bash
cd backend_fastapi
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head        # create the SQLite schema
uvicorn app.main:app --reload --port 8000
```

The server listens on the same port (8000) the frontend already targets.
Interactive docs: http://localhost:8000/docs

## Migrations

```bash
alembic revision --autogenerate -m "describe change"
alembic upgrade head
```

## Tests

```bash
pytest
```

## Notes

- Auth uses `Authorization: Bearer <access>` (SimpleJWT-compatible payload with
  a `user_id` claim). `/api/token/` accepts form-encoded `email`/`password`.
- The database is a fresh dev SQLite file; existing Django data is not migrated.
- Passwords are hashed with bcrypt, so old Django (PBKDF2) hashes won't verify —
  re-create accounts in the new DB.
