from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from django.db import connections
# Create your views here.
from rest_framework.views import APIView, Response
from django.core.files.storage import FileSystemStorage
import os
import shlex
import logging
import json
import requests
import urllib
from urllib.parse import *
from PIL import Image
import base64
from django.core import serializers
from database.models import *
from .serializers import LoginSerializer
import bcrypt
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from .forms import CommentForm
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from threading import Thread
from datetime import datetime
import time
import subprocess


class ProcessThread(Thread):
    # passing in param inits a new thread, this method overrides Thread default init method
    def __init__(self, name, token):
        Thread.__init__(self)
        self.name = name
        self.token = token
        self.started = datetime.now()

    def run(self):
        # time.sleep(3)
        headers={'authorization': 'Bearer ' + str(self.token,'utf-8')}
        titles = requests.get('http://thenubes.ddns.net/notesapp/getTitlesList', headers=headers)
        tags = requests.get('http://thenubes.ddns.net/notesapp/getTagsList', headers=headers)

        # update database
        LoginInfo.objects.filter(username=self.name).update(note={'notecount': len(titles.json()['titles']), 'tagcount':len(tags.json()['tags'])})
        finished = datetime.now()
        duration = (self.started - finished).seconds
        print("%s thread started at %s and finished at %s in %s seconds" % (self.name, self.started, finished, duration))


class TweetThread(Thread):
    # passing in param inits a new thread, this method overrides Thread default init method
    def __init__(self, name):
        Thread.__init__(self)
        self.name = name
        self.started = datetime.now()

    def run(self):
        subprocess.run(['python3','twitter_script.py',self.name], capture_output=True)
        finished = datetime.now()
        duration = (self.started - finished).seconds
        print("%s thread started at %s and finished at %s in %s seconds" % (self.name, self.started, finished, duration))


key = 'super secert key'
logger = logging.getLogger(__name__)


# handles identity managment and info, assumes request data has username, password, and fromgoogle (for google sign ins token in username field)
class LoginHandling(APIView):
    # returns all users in database
    def get(self, request, format=None):
        # queryset is select statement in SQL, objects access modelsmanager which returns the queryset
        try:
            users =[]
            note2 = Note(5,5)
            note3 = Note(5,5)
            # only checks against first param
            # test2 = LoginInfo.objects.filter(note__gte={'notecount': 5,'tagcount': 0}).filter(note__gte={'tagcount': 5,'notecount':0})
            test2 = LoginInfo.objects.all()
            print(test2)
            for userquery in test2:
                users.append(userquery.username)
            # safe removes restriction that json must be in dictionary form
            return JsonResponse(users, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

# take in username, plain text password, salt, hash and store in DB
    def post(self, request, format=None):
        # if settings.DEBUG:
        #     process_request(request)
        try:
            if request.data['fromgoogle']:
                idinfo = id_token.verify_oauth2_token(request.data['username'], grequests.Request(), "578271878997-gm7h69gce1v581nh834ka57h5kv3g81d.apps.googleusercontent.com")
                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    return JsonResponse({'message': 'wrong issuer'},status=400)
                encoded = jwt.encode({'username': idinfo['email'],'authorized': True, 'authenticated': True, 'exp': datetime.now() + timedelta(hours=48)}, key, algorithm='HS256')
                return JsonResponse({'message': 'success', 'authtoken': encoded.decode('utf8')},status=200)
            else:
                if checkUserANDPassword(request.data['username'],request.data['password'],request.data['fromgoogle']):
                    encoded = jwt.encode({'username': request.data['username'], 'authorized': True, 'authenticated': True, 'exp': datetime.now() + timedelta(hours=48)}, key, algorithm='HS256')
                    # my_thread = ProcessThread(request.data['username'], encoded)
                    # my_thread.start()
                    return JsonResponse({'message': 'success', 'authtoken': encoded.decode('utf8')},status=200)
                else:
                    return JsonResponse({'message': 'invalid login credentials'},status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

# passwords shouldn't be stored in plain text, assumes request data has username, password, and fromgoogle
class AccountCreation(APIView):
    def get(self, request, format=None):
        # print(request.GET.get('username'))
        try:
            if not checkUserExists(request.GET.get('username')):
                return JsonResponse({'message': 'no user with this username', 'created': False}, status=200)
            else:
                return JsonResponse({'message': 'username already taken', 'created': True}, status=200)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

# using googleAPI sending email as username
    def post(self, request, format=None):
        try:
            if request.data['fromgoogle']:
                idinfo = id_token.verify_oauth2_token(request.data['username'], grequests.Request(), "578271878997-gm7h69gce1v581nh834ka57h5kv3g81d.apps.googleusercontent.com")
                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    return JsonResponse({'message': 'wrong issuer'},status=400)
                # sub is unique id of users google account
                account = LoginInfo(username=idinfo['email'], note=Note(0,0), email=idinfo['email'], fromgoogle=True, googleid=idinfo['sub'])
                account.save()
                encoded = jwt.encode({'username': idinfo['email'], 'authenticated': True, 'exp': datetime.now() + timedelta(hours=48)}, key, algorithm='HS256')
                return JsonResponse({'message': 'success', 'authtoken': encoded.decode('utf8')},status=200)
            else:
                if request.data['username'] is not "" and request.data['password'] is not "":
                    if not checkUserExists(request.data['username']):
                        hashedpass = bcrypt.hashpw(request.data['password'].encode('utf-8'), bcrypt.gensalt(7))
                        account = LoginInfo(username=request.data['username'], password=hashedpass.decode('utf-8'), note=Note(0,0), email=request.data['email'] if 'email' in request.data else "", fromgoogle=False, pincode=1234)
                        account.save()
                        encoded = jwt.encode({'username': request.data['username'], 'authenticated': True, 'exp': datetime.now(
                        ) + timedelta(hours=48)}, key, algorithm='HS256')
                        return JsonResponse({'message': 'account created','authtoken': encoded.decode('utf8')}, status=201)
                    else:
                        return JsonResponse({'error': 'username already taken'}, status=400)
            return JsonResponse({'error': 'invalid fields'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

# returns true if user exists, false otherwise
def checkUserExists(username):
    try:
        user = LoginInfo.objects.get(username=username)
        if user != None:
            return True
    except LoginInfo.DoesNotExist:
        return False
    except Exception as e:
        print(str(e))
        return False
# check if user in database endpoint
def checkUser(request):
    # authtoken = jwt.decode(request.headers['Authorization'].split(' ')[1],key,algorithm='HS256' )
    authtoken = jwt.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpemVkIjp0cnVlLCJhdXRoZW50aWNhdGVkIjpmYWxzZSwiZXhwIjoxNzExMjY0MzQ2fQ.2Frw89KWy8YJglqTk6uQ4e_W6WXWZv-d79unHi3vCGA',key,algorithm='HS256' )
    try:
        if request.method == "GET" and authtoken['authorized']:
            if checkUserExists(request.GET['user']):
                return JsonResponse({'message': 'exists'}, status=200)
        return JsonResponse({'error': 'invalid'}, status=400)
    except Exception as e:
        print(e)

def checkUserANDPassword(usernamep, password, fromgoogle):
        user = LoginInfo.objects.get(username=usernamep)
        retrievedpassword = user.password.encode('utf-8')
        givenpassword = password.encode('utf-8')
        return bcrypt.checkpw(givenpassword, retrievedpassword) and not user.fromgoogle

# change users links in the database
def changeLinks(request):
    try:
        reqbody = json.loads(request.body)
        authtoken = jwt.decode(request.headers['Authorization'].split(' ')[1],key,algorithm='HS256' )
        print(authtoken)
        if request.method == "PUT" and authtoken['authenticated']:
            user = LoginInfo.objects.filter(username=authtoken['username'])
            if len(user) > 1:
                raise ValueError('user not unique')
            if 'twitter' in reqbody:
                print(reqbody['twitter'])
                # start script
                # my_thread = TweetThread(reqbody['twitter'])
                # my_thread.start()
                subprocess.call(['python3',os.getcwd() +'/database/twitter_script.py',reqbody['twitter']])
                user[0].twitterUsername = reqbody['twitter']
            if 'website' in reqbody:
                user[0].website = reqbody['website']
            if 'youtubePlaylist' in reqbody:
                user[0].youtubePlaylist = reqbody['youtubePlaylist']
            # for favorites
            # user[0].favorites = [Favorite(otheruser='two')]
            user[0].save()
            return JsonResponse({'message': 'completed'}, status=200)
        else:
            return JsonResponse({'error': 'invalid'}, status=400)
    except Exception as e:
        print(e)
        return JsonResponse({'error': str(e)}, status=400)

def getUserInfo(request):
        try:
            authtoken = jwt.decode(request.headers['Authorization'].split(' ')[1],key,algorithm='HS256' )
            if request.method == "GET" and authtoken['authenticated']:
                user = LoginInfo.objects.filter(username=authtoken['username'])
                if len(user) > 1:
                    raise ValueError('user not unique')
                print(type(user[0].twitterUsername))
                userinfo = {'twitter': user[0].twitterUsername}         
                return JsonResponse(userinfo, safe=False, status=200)
            else:
                return JsonResponse({'error': 'invalid'}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=400)

class Images(APIView):

    def get(self, request, image='00001ML.png', format=None):
        print("The value of var is %s", os.getcwd())
        # http://localhost:8000/navigator?search_term=arrow
        # request.body or request.get('search_term')
        try:
            print(request.path)
            f = open(os.getcwd() + "/pics/" + image, "rb")
            encoded_string = base64.b64encode(f.read())
            print(type(encoded_string))
            return JsonResponse({'message': encoded_string.decode('utf-8')})
            # return HttpResponse(encoded_string, content_type="text")
        except Exception as e:
            print(e)
        # img = Image.open("00001.png")
        # img.show()
        # print(f.read())

    def post(self, request, format=None):
        try:
            myfile = request.data['image']
            print(myfile)
            print(os.getcwd())
            filepath = os.getcwd() + "/pics/"
            # print(myfile.name)
            # print(filepath)
            fs = FileSystemStorage(location=filepath)
            fs.save(request.data['name'], request.data['image'])
            return JsonResponse({'message': 'Some Post Response'})
        except Exception as e:
            print(e)

def authorizationToken(request):
    try:
        # print(request.META['HTTP_USER_AGENT'].split('/')[0])
        if (request.META['HTTP_USER_AGENT'].split('/')[0] == 'Mozilla'):
            encoded = jwt.encode({'authorized': True, 'exp': datetime.now(
            ) + timedelta(hours=2)}, key, algorithm='HS256')
            return JsonResponse({'authorizeToken': encoded.decode('utf8')}, status=200)
        return JsonResponse({'error': "not a browser"}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def imagelist(request):
    try:
        # list = os.path.dirname(os.getcwd() + "/pics/")
        list = os.listdir(os.getcwd() + "/pics/")
        print((os.getcwd()))
        return JsonResponse({'list': list})
        # return HttpResponse(encoded_string, content_type="text")
    except Exception as e:
        print(e)


class Commentview(APIView):
        def get(self, request, image='00001ML.png', format=None):
            # print(request.META)
            allthecomment = list(Comments.objects.values())
            # print(allthecomment)
            return JsonResponse({'message': 'success', 'data': allthecomment})
        def post(self, request, format=None):
            details = CommentForm(request.data)
            if details.is_valid():
                # check ipaddy instead of hardcoding it
                comment = Comments(username=request.data['username'], comment=request.data['comment'], ipaddy="192.168.1.230")
                try:
                    comment.save()
                    return JsonResponse({'message': 'comment submitted'}, status=201)
                except Exception as e:
                    return JsonResponse({'error': str(e)}, status=400)
            else:
                return JsonResponse({'error': 'invalid fields'}, status=400)
                # list = details.errors.items()
                # for key, value in list:
                #     print(key, value[0])
        # puts and delete



API_KEY= 'ZCAw9cQsX-ctjUl3dP8lt9uW47llaEy1PMIeSaqxSlPbRBTXciyDvjbyJbAZwKSKPmS4GJqZOdxA0utMF8C8XIhXQeFILEwjwPBLDRKnjp-Tkm2zBsB_6OHHM_hPXnYx'


# API constants, you shouldn't have to change these.
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.
# can also use business/id/reviews

# Defaults for our simple example.
DEFAULT_TERM = 'dinner'
DEFAULT_LOCATION = 'San Francisco, CA'
SEARCH_LIMIT = 5
class YelpView(APIView):
        def get(self, request, image='00001ML.png', format=None):
            # print(request.META)
            allthecomment = list(Comments.objects.values())
            # print(allthecomment)
            return JsonResponse({'message': 'success', 'data': allthecomment})
        def post(self, request, format=None):
                print(request.data['searchparams']['limit'])
                print(request.data['searchtype'] == 'business')
                try:
                    if request.data['searchtype'] == 'business':
                        return businesspath(request)
                    else:
                        term = request.data['searchparams']['term'] if request.data['searchparams']['term'] is not '' else 'dinner'
                        url_params = {}
                        path = SEARCH_PATH
                        url = '{0}{1}'.format(API_HOST, quote(path.encode('utf8')))
                        url_params = {
                            'term': term.replace(' ', '+'),
                            'limit': SEARCH_LIMIT,
                            'latitude': request.data['searchparams']['latitude'] if request.data['searchparams']['latitude'] is not '' else 37.7749,
                            'longitude':  request.data['searchparams']['longitude'] if request.data['searchparams']['longitude'] is not '' else -122.4194,
                            'radius':  request.data['searchparams']['radius'] if request.data['searchparams']['radius'] is not '' else 12000,
                            'categories': request.data['searchparams']['radius'] if request.data['searchparams']['radius'] is not '' else 'restaurants',
                            'price': request.data['searchparams']['price'] if request.data['searchparams']['price'] is not '' else '1,2,3',
                            'open_now': request.data['searchparams']['open_now'] if request.data['searchparams']['open_now'] is not '' else True,
                            'attributes': request.data['searchparams']['attributes'] if request.data['searchparams']['attributes'] is not '' else ''
                        }
                        headers = {
                            'Authorization': 'Bearer %s' % API_KEY,
                        }
                        print(u'Querying {0} ...'.format(url))
                        # print(url_params)
                        response = requests.request('GET', url, headers=headers, params=url_params)
                        # print(response.json())
                        return JsonResponse({'res': response.json(), 'message': 'query completed'}, status=200)
                except Exception as e:
                    return JsonResponse({'error': str(e)}, status=400)


def businesspath(request):
    try:
        url_params = {}
        id = 'cQ00bfG7i-IKUlrJMVy86w'
        path = BUSINESS_PATH + id
        url = '{0}{1}'.format(API_HOST, quote(path.encode('utf8')))
        headers = {
            'Authorization': 'Bearer %s' % API_KEY,
        }
        print(u'Querying {0} ...'.format(url))
        response = requests.request('GET', url, headers=headers, params=url_params)
        # print(response.json())
        return JsonResponse({'res': response.json(), 'message': 'query completed'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)



# some custom middleware

# def process_request(request):
    # WSGI request
    # print("we are in the middle", request.data)

# getting client IP
# def get_client_ip(request):
#     x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
#     if x_forwarded_for:
#         ip = x_forwarded_for.split(',')[0]
#     else:
#         ip = request.META.get('REMOTE_ADDR')
#     return ip

# In a view or a middleware where the `request` object is available
