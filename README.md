# Uploader - Django + React Application

This application combines a Django backend with a React frontend, optimized for deployment on Render.

## Project Structure

- **Backend**: Django REST API with JWT authentication
- **Frontend**: React application built with Vite

## Local Development

### Backend Setup

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

1. Build the frontend:
   ```
   cd Frontend
   npm run build
   ```
   This will automatically build the React app into the `Backend/dist` directory.

2. Collect static files:
   ```
   cd Backend
   python manage.py collectstatic --no-input
   ```

## Deployment on Render

This application is configured for deployment on Render as a Web Service.

### Deployment Steps

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following settings:
   - **Environment**: Python
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn Backend.wsgi:application`

### Environment Variables

Set the following environment variables in Render:

- `DJANGO_SECRET_KEY`: A secure random string
- `DJANGO_DEBUG`: Set to 'False' for production

## How It Works

- The Django backend serves the React frontend at the root URL
- Static files are served using Whitenoise
- API endpoints are available at `/api/`
- React Router handles client-side routing
