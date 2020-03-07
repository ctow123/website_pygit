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

# this tracks users click on the app page
class Yelpdata(models.Model):
    username = models.CharField(max_length=100)
    clickdata = models.CharField(max_length=1000)
    clicktime = models.IntegerField()
    lat = models.FloatField()
    long = models.FloatField()
    
# this is the user feedback via reviews on their experience @ resturant
class YelpUserReviews(models.Model):
    username = models.CharField(max_length=200)
    experience = models.CharField(max_length=200)
    experiencesuggested = models.BooleanField(default=True)
    restaurant = models.CharField(max_length=200)
    restaurantsuggested = models.BooleanField(default=True)
    rating = models.IntegerField()

# this is for picking the resturant for the experience
class YelpRecommedations(models.Model):
    experience = models.CharField(max_length=200)
    restaurant = models.CharField(max_length=200)
    rating = models.IntegerField()
    lat = models.FloatField()
    long = models.FloatField()
