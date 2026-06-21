# Deploying PetPal to Render

Three pieces deploy from this repo via the [`render.yaml`](render.yaml) blueprint:

| Service        | Type        | What it is                    |
|----------------|-------------|-------------------------------|
| `petpal-api`   | Web (Python)| FastAPI backend (gunicorn)    |
| `petpal-web`   | Static      | React frontend (built)        |
| `petpal-db`    | Postgres    | Production database           |

## One-time setup

1. **Push the repo to GitHub** (if it isn't already), including `render.yaml`.

2. **Create the services from the blueprint**
   - In Render: **New + → Blueprint**, pick this repo.
   - Render reads `render.yaml` and creates `petpal-api`, `petpal-web`, and `petpal-db`.
   - It will prompt for the `sync: false` env vars — you can leave them blank for now and set them in step 4.

3. **First deploy runs automatically**
   - Backend build runs `pip install` then `alembic upgrade head` (creates the Postgres schema).
   - Frontend build runs `npm run build`.

4. **Wire the URLs together** (after both services have URLs, e.g.
   `https://petpal-api.onrender.com` and `https://petpal-web.onrender.com`):

   On **petpal-api** → Environment:
   - `PUBLIC_BACKEND_URL` = `https://petpal-api.onrender.com`
   - `CORS_ALLOWED_ORIGINS` = `https://petpal-web.onrender.com`

   On **petpal-web** → Environment:
   - `REACT_APP_API_URL` = `https://petpal-api.onrender.com`

   Then **Manual Deploy → Clear build cache & deploy** on both (the frontend must
   rebuild to bake in `REACT_APP_API_URL`).

5. **Done.** Visit the `petpal-web` URL.

## How it works

- `app/config.py` reads everything from env vars with local-dev fallbacks, so
  nothing here affects `npm start` / `uvicorn` locally.
- `DATABASE_URL` is injected by Render from the Postgres add-on; the code rewrites
  the `postgres://` scheme to `postgresql://` for SQLAlchemy.
- Uploaded images are stored on a 1 GB persistent disk mounted at `/var/data`
  (`MEDIA_ROOT`), so they survive redeploys.
- The static site has an SPA rewrite (`/* → /index.html`) so client routes work
  on refresh.

## Notes / gotchas

- **Free tier** spins the backend down after inactivity; the first request after
  idle takes ~30s to wake. Fine for a demo/portfolio.
- **Migrations**: any future schema change needs a new Alembic revision committed;
  `alembic upgrade head` runs on every deploy.
- **Fresh database**: production starts empty. Sign up new accounts in the
  deployed app (local dev data is not copied).
- To deploy updates later: just `git push` — Render auto-deploys.

## Local development is unchanged

```bash
# backend
cd backend_fastapi && source .venv/bin/activate
alembic upgrade head && uvicorn app.main:app --reload --port 8000

# frontend
cd frontend && npm install && npm start
```
