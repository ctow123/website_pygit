# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import database.routing
from django.urls import re_path, path

def process_request( request):
        # this will get hit first before all the other middleware, uncomment line below to debug
        import pdb
        # pdb.set_trace()
        # WSGI request
        print("we are in the middle", request)
        # return HttpResponse("in exception")
        # return None
       #  allowed_ips = ['192.168.1.1', '123.123.123.123', etc...] # Authorized ip's
       #  ip = request.META.get('REMOTE_ADDR') # Get client IP
       #  if ip not in allowed_ips:
       #      raise Http403 # If user is not allowed raise Error
       #
       # # If IP is allowed we don't do anything
       # return None
       #







# from `./database/consumers.py` import consumers/
# if the connection is a websocket it will be passed here
# the url router will route it to a consumer based on url
application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': 
        URLRouter(
            database.routing.websocket_urlpatterns,
            # path('ws/chat',),
        )
    ,
})

# can add middleware like this
# application = ProtocolTypeRouter({
#     # (http->django views is added by default)
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             chat.routing.websocket_urlpatterns
#         )
#     ),
# })
