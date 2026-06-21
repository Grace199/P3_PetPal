"""End-to-end smoke tests for the FastAPI backend.

Runs against an isolated temporary SQLite database so it never touches dev data.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db import Base, get_db
from app.main import app


@pytest.fixture()
def client(tmp_path):
    engine = create_engine(
        f"sqlite:///{tmp_path/'test.db'}",
        connect_args={"check_same_thread": False},
    )
    Base.metadata.create_all(bind=engine)
    TestingSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)

    def override_get_db():
        db = TestingSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


def _auth(client, email):
    token = client.post(
        "/api/token/", data={"email": email, "password": "password1"}
    ).json()["access"]
    return {"Authorization": f"Bearer {token}"}


def test_full_flow(client):
    # Signups
    assert client.post("/accounts/seeker/signup/", json={
        "account": {"email": "s@x.com", "name": "Seeker",
                    "password1": "password1", "password2": "password1"},
        "city": "Toronto", "province": "ON", "phone_number": 4161234567,
    }).status_code == 201
    assert client.post("/accounts/shelter/signup/", json={
        "account": {"email": "h@x.com", "name": "Shelter",
                    "password1": "password1", "password2": "password1"},
        "address": "1 St", "city": "Toronto", "province": "ON",
        "phone_number": 4169999999, "description": "We help pets",
    }).status_code == 201

    sh = _auth(client, "s@x.com")
    rh = _auth(client, "h@x.com")

    assert client.get("/currentuser/", headers=sh).json()["is_seeker"] is True
    assert client.get("/currentuser/", headers=rh).json()["is_seeker"] is False
    assert client.get("/currentuser/").status_code == 401

    # Pet listing (multipart with dotted keys)
    form = {
        "pet.animal_type": "dog", "pet.name": "Rex", "pet.age": "2",
        "pet.sex": "male", "pet.size": "2", "pet.colour": "black",
        "pet.breed": "Lab", "pet.description": "good boy", "pet.weight": "20",
        "status": "AVAILABLE", "adoption_fee": "100",
    }
    listing = client.post("/petlisting/", headers=rh, data=form)
    assert listing.status_code == 201
    lid = listing.json()["id"]
    assert client.post("/petlisting/", headers=sh, data=form).status_code == 401

    # Application
    appform = {
        "residence_type": "house", "fenced_yard": "yes", "pool": "no",
        "current_pets": "none", "address": "2 St", "city": "TO",
        "postal_code": "M1M", "phone_number": "4160000000", "children": "0",
        "children_under_13": "0", "good_fit": "y", "schedule": "f",
        "insurance": "y", "references": "x", "vet": "y",
    }
    app_resp = client.post(f"/applications/seeker/application/{lid}/", headers=sh, json=appform)
    assert app_resp.status_code == 201
    aid = app_resp.json()["id"]

    listing_page = client.get("/applications/shelter/list/", headers=rh).json()
    assert listing_page["count"] == 1
    assert len(listing_page["results"]) == 1
    assert client.get("/notification/unread/", headers=rh).json()["unread_count"] == 1
    assert client.patch(f"/applications/shelter/{aid}/", headers=rh,
                        json={"status": "accepted"}).status_code == 200
