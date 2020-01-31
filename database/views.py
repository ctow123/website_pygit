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
from PIL import Image
import base64
from django.core import serializers
from database.models import LoginInfo
from .serializers import LoginSerializer
import bcrypt
import jwt
from datetime import datetime, timedelta

password = b"super secret password"
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
        process_request(request)
        if 'username' in request.data and 'password' in request.data:
            user = LoginInfo.objects.get(username=request.data['username'])
            print("this is the user ", type(user))
            print(user.password)
        # insert into database or used to validate user
        # print(request.META)
        # decoded = jwt.decode(encoded, key, algorithms='HS256')
        # print(request.data)
        hashed = bcrypt.hashpw(password, bcrypt.gensalt(7))
        if bcrypt.checkpw(password, hashed):
            encoded = jwt.encode({'some': 'payload', 'exp': datetime.now() + timedelta(hours=24)}, key, algorithm='HS256')
            print("It Matches!")
            # print(encoded)
            return JsonResponse({'message': encoded.decode('utf8')})
        else:
            print("It Does not Match")
        return JsonResponse({'message': 'Some Post Response'})

class AccountCreation(APIView):
        def post(self, request, format=None):
            if 'username' in request.data and 'password' in request.data and 'email' in request.data:
                account = LoginInfo(username=request.data['username'], password=request.data['password'], email=request.data['email'] ,pincode=1234)
                try:
                    account.save()
                    return JsonResponse({'message': 'account created'},status=201)
                except Exception as e:
                    return JsonResponse({'message': str(e)},status=400)
            else:
                return JsonResponse({'message': 'invalid fields'},status=400)


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
            filepath = os.getcwd()+"/database/pics/"
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

# some custom middleware
def process_request(request):
    # WSGI request
    print("we are in the middle", request.data)
