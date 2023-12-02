#!/bin/bash

# Install necessary apt packages
sudo apt-get update
sudo apt-get install -y python3 python3-venv

# Set up a virtual environment
virtualenv venv
source venv/bin/activate

# Upgrade pip and install required Python packages
pip install --upgrade pip
pip install django pillow djangorestframework djangorestframework-simplejwt

# Run Django migrations
./manage.py makemigrations
./manage.py migrate