from django.db import models

# Create your models here.
# each model usually maps to single database table -> here basically making the database table

class LoginInfo(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    pincode = models.IntegerField()
    email = models.CharField(max_length=150, null=True)

    def __str__(self):
        return self.username

class Testing(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    pincode = models.IntegerField()

    def __str__(self):
        return self.username
