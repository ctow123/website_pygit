from django.urls import path, re_path

from . import views
from django.conf import settings
from django.conf.urls.static import static
from database.views import LoginHandling, Images,AccountCreation

urlpatterns = [
    # ex: /polls/
    path(r'login', LoginHandling.as_view(), name='login'),
    path(r'create', AccountCreation.as_view(), name='createaccount'),
    path('image', Images.as_view()),
    path('image/', Images.as_view()),
    path('image/<str:image>', Images.as_view()),
    path('imagelist', views.imagelist, name='imglist'),
    # path('sendimgs/', views.sendimgs, name='sendimages'),
    # path('downloadimgs/', views.downloadimgs, name='downloadimages'),
    # path(r'^', views.index, name='index')
    # '^$' means empty string
    # # ex: /polls/5/
    # path('<int:question_id>/', views.detail, name='detail'),
    # # ex: /polls/5/results/
    # path('<int:question_id>/results/', views.results, name='results'),
    # # ex: /polls/5/vote/
    # path('<int:question_id>/vote/', views.vote, name='vote'),
]

# urlpatterns = [
#     url(r'customview', CustomView.as_view()),
# ]
