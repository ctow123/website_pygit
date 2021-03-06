bind = "127.0.0.1:9000"                   # Don't use port 80 becaue nginx occupied it already.
errorlog = '/Users/connorpro/desktop/website_py2/logs/gunicorn-error.log'  # Make sure you have the log folder create
accesslog = '/Users/connorpro/desktop/website_py2/logs/gunicorn-access.log'
loglevel = 'debug'
workers = 4     # the number of recommended workers is '2 * number of CPUs + 1' 
