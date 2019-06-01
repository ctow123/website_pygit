# todo/serializers.py
# We need serializers to convert model instances to JSON so that the frontend
# can work with the received data easily. We will create a todo/serializers.py file:


# https://simpleisbetterthancomplex.com/tutorial/2016/07/27/how-to-return-json-encoded-response.html

from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentsystem
        fields = ('id', 'date', 'name', 'comment')
        # fields = '__all__'
