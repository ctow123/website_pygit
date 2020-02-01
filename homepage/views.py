from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, Http404
from django.template import loader
import string
import os, shlex
from django.views.decorators.csrf import csrf_exempt
from django import forms
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import subprocess

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()
# def index(request):
#     latest_question_list = Question.objects.order_by('-pub_date')[:5]
#     template = loader.get_template('polls/index.html')
#     context = {
#         'latest_question_list': latest_question_list,
#     }
#     return HttpResponse(template.render(context, request))

def index(request):
    print(request)
    # removing / in the path because already in curr dir
    str = request.META['PATH_INFO']
    str = str.replace(str[0], '', 1)
    print("new string " + str)
    if request.META['PATH_INFO'] == '/':
        t = loader.get_template('index.html')
    else:
        t = loader.get_template(str)
    c = {'foo': 'bar'}
    return HttpResponse(t.render(c, request))

def sendimgs(request):
    if request.method == 'POST':
        myfile = request.FILES['image']
        filepath = os.getcwd()+"/pics/"
        print(myfile.name)
        print(filepath)
        fs = FileSystemStorage(location=filepath)
        fs.save(myfile.name, myfile)
    #   running face reg script
    filepath2 = os.getcwd() + "/ML/"
    os.chdir(filepath2)
    script ='/usr/local/bin/python recognize_faces_image.py --encodings encodings2.pickle --image ' + '../pics/' + myfile.name
    shlex.split(script)
    # + myfile
    p = subprocess.Popen(script, shell=True)
    p.wait()
    os.chdir('..')
    # returning analyzed picture
    return JsonResponse({"name": "connorwin"})
#     os.chdir('..') moves up one directory

def downloadimgs(request):
    return JsonResponse({"name": "connorwin"})
