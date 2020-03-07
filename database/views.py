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

key = 'super secert key'
logger = logging.getLogger(__name__)


class LoginHandling(APIView):

    def get(self, request, format=None):
        # queryset is select statement in SQL, objects access modelsmanager which returns the queryset
        test = LoginInfo.objects.all()
        # test = LoginInfo.objects.all().filter(username=?)
        # test = LoginInfo.objects.get(username="admin")
        data = test.values()[0]
        print(test.values()[0])
        print(data['id'])
        print(type(data))
        # cereal = LoginSerializer.transform(data3)
        data = {
            'name': 'Vitor',
            'location': 'Finland',
            'is_active': True,
            'count': 28
        }
        # safe removes restriction that json must be in dictionary form
        return JsonResponse([1, 2, 3, 4], safe=False)

# take in username, plain text password, salt, hash and store in DB
    def post(self, request, format=None):
        # process_request(request)
        try:
            if 'username' in request.data and 'password' in request.data:
                user = LoginInfo.objects.get(username=request.data['username'])
                retrievedpassword = user.password.encode('utf-8')
                givenpassword = request.data['password'].encode('utf-8')
                # print("this is the user ", type(givenpassword))
                # print(user.password)
                hashed = bcrypt.hashpw(givenpassword, bcrypt.gensalt(7))
                if bcrypt.checkpw(retrievedpassword, hashed):
                    encoded = jwt.encode({'username': request.data['username'], 'authenticated': True, 'exp': datetime.now(
                    ) + timedelta(hours=24)}, key, algorithm='HS256')
                    if settings.DEBUG:
                        print("It Matches!")
                    return JsonResponse({'message': 'success', 'authtoken': encoded.decode('utf8')})
            else:
                if settings.DEBUG:
                    print("It Does not Match")
                return JsonResponse({'message': 'invalid login credentials'},status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

class AccountCreation(APIView):
    def post(self, request, format=None):
        if 'username' in request.data and 'password' in request.data:
            if request.data['username'] is not "" and request.data['password'] is not "":
                try:
                    user = LoginInfo.objects.get(username=request.data['username'])
                    if user != None:
                        return JsonResponse({'error': 'username already taken'}, status=400)
                except LoginInfo.DoesNotExist:
                    account = LoginInfo(username=request.data['username'], password=request.data['password'], email="", pincode=1234)
                try:
                    account.save()
                    return JsonResponse({'message': 'account created'}, status=201)
                except Exception as e:
                    return JsonResponse({'error': str(e)}, status=400)
        return JsonResponse({'error': 'invalid fields'}, status=400)


class Auth(APIView):
    def post(self, request, format=None):
        print(request.headers)
        # Authorization =  `Bearer ${token}`;
        return JsonResponse({'message': 'account created'}, status=201)
        # decoded = jwt.decode(encoded, key, algorithms='HS256')
        # if 'username' in request.data and 'password' in request.data and 'email' in request.data:
        #     try:
        #         account.save()
        #         return JsonResponse({'message': 'account created'},status=201)
        #     except Exception as e:
        #         return JsonResponse({'message': str(e)},status=400)
        # else:
        #     return JsonResponse({'message': 'no auth token found'},status=400)


class Images(APIView):

    def get(self, request, image='00001ML.png', format=None):
        print("The value of var is %s", os.getcwd())
        # http://localhost:8000/navigator?search_term=arrow
        # request.body or request.get('search_term')
        try:
            print(request.path)
            f = open(os.getcwd() + "/database/pics/" + image, "rb")
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
            filepath = os.getcwd() + "/database/pics/"
            # print(myfile.name)
            # print(filepath)
            fs = FileSystemStorage(location=filepath)
            fs.save(request.data['name'], request.data['image'])
            return JsonResponse({'message': 'Some Post Response'})
        except Exception as e:
            print(e)


def imagelist(request):
    try:
        list = os.listdir(os.getcwd() + "/database/pics/")
        print(list)
        return JsonResponse({'list': list})
        # return HttpResponse(encoded_string, content_type="text")
    except Exception as e:
        print(e)

def yelptracking(request):
    requestdata = json.loads(request.body.decode('utf-8'))
    try:
        if requestdata['datatype'] == 'click':
            loginfo = Yelpdata(
                username=requestdata['username'], clickdata=requestdata['action'],
                clicktime=requestdata['clicktime'], lat=requestdata['latitude'], long=requestdata['longitude'])
            loginfo.save()
        elif requestdata['datatype'] == 'review':
            loginfo = YelpUserReviews(
                username=requestdata['username'], comment=requestdata['comment'], ipaddy="192.168.1.230")
            loginfo.save()
        return JsonResponse({'message': 'success'})
        # return HttpResponse(encoded_string, content_type="text")
    except Exception as e:
        print(e)
        return JsonResponse({'error': str(e)}, status=400)


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

# pip install django-ipware
# from ipware import get_client_ip
# ip, is_routable = get_client_ip(request)
# if ip is None:
#     # Unable to get the client's IP address
# else:
#     # We got the client's IP address
#     if is_routable:
#         # The client's IP address is publicly routable on the Internet
#     else:
#         # The client's IP address is private
#
# # Order of precedence is (Public, Private, Loopback, None)
# i, r = get_client_ip(request, request_header_order=['X_FORWARDED_FOR', 'REMOTE_ADDR'])
