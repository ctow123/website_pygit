# from django.db import models
from djongo import models
import datetime

# Create your models here.
# each model usually maps to single database table -> here basically making the database table

class Note(models.Model):
    notecount = models.IntegerField(0)
    tagcount = models.IntegerField(0)

    class Meta:
        abstract = True

class Favorite(models.Model):
    otheruser = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        abstract = True

class LoginInfo(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.IntegerField()
    email = models.CharField(max_length=150, blank=True)
    fromgoogle = models.BooleanField(default=False)
    googleid = models.CharField(max_length=50, blank=True, null=True)
    note = models.EmbeddedField( model_container=Note)
    twitterUsername = models.CharField(max_length=50, blank=True, null=True)
    website = models.CharField(max_length=150, blank=True, null=True)
    youtubePlaylist = models.CharField(max_length=150, blank=True, null=True)
    favorites = models.ArrayField(
        model_container=Favorite, blank=True, null=True
    )
    objects = models.DjongoManager()
    profilePicPath = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.username




class Usage(models.Model):
    user = models.CharField(max_length=30)
    timelogged = models.IntegerField()
    clickdata = models.CharField(max_length=1000)
    ipaddress = models.CharField(max_length=100, null=True)




class Comments(models.Model):
    username = models.CharField(max_length=100)
    comment = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    ipaddy = models.CharField(max_length=100, null=True)
    # slug = models.SlugField(max_length=100)

    def __str__(self):
        return self.username

# # this tracks users click on the app page
# class Yelpdata(models.Model):
#     username = models.CharField(max_length=100)
#     clickdata = models.CharField(max_length=1000)
#     clicktime = models.IntegerField()
#     lat = models.FloatField()
#     long = models.FloatField()
#
# # this is the user feedback via reviews on their experience @ resturant
# class YelpUserReviews(models.Model):
#     username = models.CharField(max_length=200)
#     experience = models.CharField(max_length=200)
#     experiencesuggested = models.BooleanField(default=True)
#     restaurant = models.CharField(max_length=200)
#     restaurantsuggested = models.BooleanField(default=True)
#     rating = models.IntegerField()
#
# # this is for picking the resturant for the experience
# class YelpRecommedations(models.Model):
#     experience = models.CharField(max_length=200)
#     restaurant = models.CharField(max_length=200)
#     rating = models.IntegerField()
#     lat = models.FloatField()
#     long = models.FloatField()
