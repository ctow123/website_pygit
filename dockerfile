 # pull official base image
FROM python:3.7-alpine

# set environment varibles
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1
#RUN useradd -ms /bin/bash admin
# set work directory
WORKDIR /usr/src/app

# install dependencies
RUN pip install --upgrade pip

#COPY ./Pipfile /usr/src/app/Pipfile
#RUN pipenv install --skip-lock --system --dev

# copy project
COPY . /usr/src/app/
RUN pip install -r requirements.txt
# EXPOSE port 8000 to allow communication to/from server
EXPOSE 9000
#RUN chown -R admin:admin /app
RUN chmod 755 ./
#USER admin
# CMD specifcies the command to execute to start the server running.
CMD ["/usr/local/bin/gunicorn","-c","gunicorn.conf.py","website_py2.wsgi"]
# done!