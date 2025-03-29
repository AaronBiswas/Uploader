from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.shortcuts import render

def frontend(request, path=''):
    """
    Serve the React frontend for any non-API/admin routes.
    This allows React Router to handle client-side routing.
    """
    return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # Serve the React app at the root URL and any other paths not matched above
    path('', frontend, name='frontend'),
    path('<path:path>', frontend, name='frontend-paths'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Add URL pattern for media files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
