from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, FileViewSet, dashboard_stats
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'files', FileViewSet)

urlpatterns = [
    path('', include(router.urls)),  # No 'api/' prefix
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('dashboard/', dashboard_stats, name='dashboard'),
]
