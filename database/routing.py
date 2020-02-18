from django.urls import re_path, path
from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
        # re_path(r'^', consumers.CommentConsumer, name='goodgood'),
      url(r'^apidb/ws/chat', consumers.CommentConsumer),
      # ^  apidb because not routing with WSGI server but ASGI server 
]
