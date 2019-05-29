from django.shortcuts import render
from django.http import JsonResponse

from django.db import connections
# Create your views here.
from rest_framework.views import APIView, Response

import logging

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
        return JsonResponse(data)

    def post(self, request, format=None):

        return Response("Some Post Response")

# def query(lname)
#     c = connections['state_db'].cursor()
#     c.execute("SELECT last_name FROM STATE.table WHERE last_name=%s;",[lname])
#     rows = c.fetchall()
