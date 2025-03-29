# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator

# Custom User Model
class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

# Address Model
class Address(models.Model):
    user = models.ForeignKey(User, related_name='addresses', on_delete=models.CASCADE)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.street_address}, {self.city}"

    def save(self, *args, **kwargs):
        if self.is_primary:
            # Set all other addresses of this user to non-primary
            Address.objects.filter(user=self.user).update(is_primary=False)
        super().save(*args, **kwargs)

# File Model
class UploadedFile(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/', validators=[FileExtensionValidator(['pdf', 'xls', 'xlsx', 'txt'])])
    uploaded_at = models.DateTimeField(auto_now_add=True)
    filename = models.CharField(max_length=255, blank=True, null=True)
    file_type = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.filename or self.file.name

    def save(self, *args, **kwargs):
        if not self.filename:
            self.filename = self.file.name
        if not self.file_type and self.filename:
            extension = self.filename.split('.')[-1].lower()
            self.file_type = extension
        super().save(*args, **kwargs)
