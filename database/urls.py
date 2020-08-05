from django.urls import path, re_path
from django.http import JsonResponse, HttpResponse

from . import views
from django.conf import settings
from django.conf.urls.static import static
from database.views import LoginHandling, Images,AccountCreation, Commentview, YelpView

def response_error_handler(request, title, year, exception=None):
    return HttpResponse('Error handler content', status=404)

urlpatterns = [
    # ex: /polls/
    path('login', LoginHandling.as_view(), name='login'),
    path(r'create', AccountCreation.as_view(), name='createaccount'),
    path('comments', Commentview.as_view(), name='comment'),
    # path('yelpappAPI', YelpView.as_view(), name='yelpaddon'),
    path('image', Images.as_view()),
    path('authorize', views.authorizationToken),
    path('image/<str:image>', Images.as_view()),
    path('imagelist', views.imagelist, name='imglist'),
    path('userlinks', views.changeLinks, name='changeLinks'),
    path('checkuser', views.checkUser, name='checkUser'),
    path('userInfo', views.getUserInfo, name='userInfo'),
    path('blog/<title>/<int:year>', response_error_handler, name='blog'),
    # re_path(r'^', response_error_handler),
    # path('sendimgs/', views.sendimgs, name='sendimages'),
    # path('downloadimgs/', views.downloadimgs, name='downloadimages'),
    # '^$' means empty string
    # # ex: /polls/5/vote/
    # path('<int:question_id>/vote/', views.vote, name='vote'),
]

# urlpatterns = [
#     url(r'customview', CustomView.as_view()),
# ]
