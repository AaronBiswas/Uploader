#!/usr/bin/env bash
# exit on error
set -o errexit

# Install python dependencies
pip install -r requirements.txt

# Make sure the dist directory exists
mkdir -p dist

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate
