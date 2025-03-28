from django.shortcuts import render
from django.contrib.auth.models import User  # Ensure the correct User model is used
from django.db import models
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import UploadedFile
from .serializers import UserSerializer, FileSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

# Custom JWT Serializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username  # Add username to token
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# File Upload Viewset
class FileViewSet(viewsets.ModelViewSet):
    queryset = UploadedFile.objects.all()
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can upload files

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Assign logged-in user to file

# User Registration Viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to register

# Dashboard API (Requires Authentication)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_stats(request):
    total_files = UploadedFile.objects.count()
    file_types = UploadedFile.objects.values('file').annotate(count=models.Count('file'))
    user_uploads = UploadedFile.objects.values('user').annotate(count=models.Count('user'))
    
    return Response({
        'total_files': total_files,
        'file_types': file_types,
        'user_uploads': user_uploads,
    })
