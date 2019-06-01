from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from django.db import connections
# Create your views here.
from rest_framework.views import APIView, Response
from django.core.files.storage import FileSystemStorage
import os
import shlex
import logging
from PIL import Image
import base64

logger = logging.getLogger(__name__)


class CustomView(APIView):

    def get(self, request, format=None):
        print("The value of var is %s", APIView)
        data = {
            'name': 'Vitor',
            'location': 'Finland',
            'is_active': True,
            'count': 28
        }
        # safe removes restriction that json must be in dictionary form
        return JsonResponse([1, 2, 3, 4], safe=False)

    def post(self, request, format=None):

        return JsonResponse({'message': 'Some Post Response'})


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


# def query(lname)
#     c = connections['state_db'].cursor()
#     c.execute("SELECT last_name FROM STATE.table WHERE last_name=%s;",[lname])
#     rows = c.fetchall()
