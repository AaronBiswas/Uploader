from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.shortcuts import render

def frontend(request):
    return render(request, 'index.html')

urlpatterns = [
    path('', frontend, name='frontend'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
