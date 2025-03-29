# Uploader

Django + React application deployed on Render.

## Setup

### Backend
```
cd Backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```
cd Frontend
npm install
npm run dev
```

## Build
```
cd Frontend
npm run build

cd Backend
python manage.py collectstatic --no-input
```

## Deploy
- Build Command: `./build.sh`
- Start Command: `gunicorn Backend.wsgi:application`
- Environment: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`
