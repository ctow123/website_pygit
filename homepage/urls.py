from django.urls import path, re_path

from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ex: /polls/
    path('sendimgs/', views.sendimgs, name='sendimages'),
    path('downloadimgs/', views.downloadimgs, name='downloadimages'),

    # '^$' means empty string
    # path('navbar.html', views.nav, name='nav')
    # # ex: /polls/5/
    # path('<int:question_id>/', views.detail, name='detail'),
    # # ex: /polls/5/results/
    # path('<int:question_id>/results/', views.results, name='results'),
    # # ex: /polls/5/vote/
    # path('<int:question_id>/vote/', views.vote, name='vote'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# adds static support for media folder aka pics

# catch all
urlpatterns += [re_path(r'^', views.index, name='index'),]