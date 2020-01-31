# todo/serializers.py
# We need serializers to convert model instances to JSON so that the frontend
# can work with the received data easily. We will create a todo/serializers.py file:


# https://simpleisbetterthancomplex.com/tutorial/2016/07/27/how-to-return-json-encoded-response.html

from rest_framework import serializers
from .models import LoginInfo
#
#
class LoginSerializer(serializers.ModelSerializer):
    # used in the isvalid method
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    pincode = serializers.IntegerField()

# when in views.py and just using ex. views.LoginInfo.as_view() this is what is called and these
# fields are extracted
    class Meta:
        model = LoginInfo
        fields = ('username', 'password','pincode')
        # fields = '__all__'
# on instance of this class can call this to transform data how you want

    def transform(data):
        listo = list(data)
        print('hello', listo)

        print('hello', listo.index('id'))
