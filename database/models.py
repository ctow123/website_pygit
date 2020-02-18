from django.db import models
import datetime

# Create your models here.
# each model usually maps to single database table -> here basically making the database table

class LoginInfo(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    pincode = models.IntegerField()
    email = models.CharField(max_length=150, null=True)

    def __str__(self):
        return self.username

class Comments(models.Model):
    username = models.CharField(max_length=100)
    comment = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    ipaddy = models.CharField(max_length=100, null=True)
    # slug = models.SlugField(max_length=100)

    def __str__(self):
        return self.username
