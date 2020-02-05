from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse
# or use this class testthemiddle(MiddlewareMixin):
class testthemiddle(MiddlewareMixin):
    # needed if using testthemiddle(object)
    # def __init__(self, get_response):
    #     self.get_response = get_response
    #
    # def __call__(self, request):
    #     return self.get_response(request)
    # Check if client IP is allowed
    def process_request(self, request):
        #this will get hit first before all the other middleware, uncomment line below to debug
        import pdb; pdb.set_trace()
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
