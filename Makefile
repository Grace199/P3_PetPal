.PHONY: help setup venv install migrate makemigrations run clean frontend-install frontend-run dev

# Config
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# venv lives inside backend/
VENV_DIR=venv
PYTHON=$(VENV_DIR)/bin/python
PIP=$(VENV_DIR)/bin/pip

help:
	@echo "Available commands:"
	@echo "  make setup          Install system deps (Linux) + create venv + install packages"
	@echo "  make venv           Create backend virtual environment"
	@echo "  make install        Install backend Python dependencies"
	@echo "  make migrate        Apply Django migrations"
	@echo "  make makemigrations Create Django migrations"
	@echo "  make run            Run Django dev server"
	@echo "  make frontend-install  Install frontend deps"
	@echo "  make frontend-run      Run frontend dev server"
	@echo "  make dev            Run backend + frontend"
	@echo "  make clean          Remove backend virtual environment"

# ---- System dependencies (Ubuntu/Debian only) ----
setup:
	sudo apt-get update
	sudo apt-get install -y python3 python3-venv
	$(MAKE) install

# ---- Virtualenv ----
venv:
	cd $(BACKEND_DIR) && python3 -m venv $(VENV_DIR)

# ---- Install deps ----
install: venv
	cd $(BACKEND_DIR) && $(PIP) install --upgrade pip
	cd $(BACKEND_DIR) && $(PIP) install -r requirements.txt

# ---- Django commands ----
makemigrations:
	cd $(BACKEND_DIR) && $(PYTHON) manage.py makemigrations

migrate:
	cd $(BACKEND_DIR) && $(PYTHON) manage.py migrate

run:
	cd $(BACKEND_DIR) && $(PYTHON) manage.py runserver

# ---- Frontend ----
frontend-install:
	cd $(FRONTEND_DIR) && npm install

frontend-run:
	cd $(FRONTEND_DIR) && npm start

dev:
	$(MAKE) run & \
	$(MAKE) frontend-run

# ---- Cleanup ----
clean:
	rm -rf $(BACKEND_DIR)/$(VENV_DIR)