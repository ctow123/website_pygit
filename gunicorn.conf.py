#
# Server socket
#
#   bind - The socket to bind.
#
#       A string of the form: 'HOST', 'HOST:PORT', 'unix:PATH'.
#       An IP is a valid HOST.
#
#   backlog - The number of pending connections. This refers
#       to the number of clients that can be waiting to be
#       served. Exceeding this number results in the client
#       getting an error when attempting to connect. It should
#       only affect servers under significant load.
#
#       Must be a positive integer. Generally set in the 64-2048
#       range.
#
bind = "127.0.0.1:8000"                   # Don't use port 80 becaue nginx occupied it already.
backlog = 1024

#   Logging
#
#   logfile - The path to a log file to write to.
#       A path string. "-" means log to stdout.
#
#   loglevel - The granularity of log output
#       A string of "debug", "info", "warning", "error", "critical"
#

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
errorlog = BASE_DIR + '/logs/gunicorn-error.log'  # Make sure you have the log folder create
accesslog = BASE_DIR + '/logs/gunicorn-access.log'
loglevel = 'debug'
workers = 1     # the number of recommended workers is '2 * number of CPUs + 1'
worker_class = 'gevent'
#   timeout - If a worker does not notify the master process in this
#       number of seconds it is killed and a new worker is spawned
#       to replace it.
#
#       Generally set to thirty seconds. Only set this noticeably
#       higher if you're sure of the repercussions for sync workers.
#       For the non sync workers it just means that the worker
#       process is still communicating and is not tied to the length
#       of time required to handle a single request.
#
#   keepalive - The number of seconds to wait for the next request
#       on a Keep-Alive HTTP connection.
#
#       A positive integer. Generally set in the 1-5 seconds range.
#
timeout = 30
keepalive = 2
