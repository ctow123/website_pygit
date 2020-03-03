# USAGE
# python train_yelp_recommend.py --encodings encodings.pickle --image examples/example_01.png

# import the necessary packages
import pandas as pd
from pymongo import MongoClient
import argparse
import pickle
import csv, os
from django.core.files.storage import FileSystemStorage

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-e", "--encodings", required=False,
                help="path to serialized db of facial encodings")
ap.add_argument("-i", "--image", required=False,
                help="path to input image")
ap.add_argument("-d", "--detection-method", type=str, default="cnn",
                help="face detection model to use: either `hog` or `cnn`")
args = vars(ap.parse_args())
collection = 'database_comments'
username = 'superuser'
password = 'qwe-34-vo'
# connect to mongo database
def _connect_mongo(host, port, username, password, db):
    """ A util for making a connection to mongo """

    if username and password:
        mongo_uri = 'mongodb://%s:%s@%s:%s/%s' % (username, password, host, port, db)
        conn = MongoClient(mongo_uri)
    else:
        conn = MongoClient(host, port)


    return conn[db]


def read_mongo(db, collection, query={}, host='localhost', port=27017, username=None, password=None, no_id=True):
    """ Read from Mongo and Store into DataFrame """

    # Connect to MongoDB
    db = _connect_mongo(host=host, port=port, username=username, password=password, db=db)

    # Make a query to the specific DB and Collection
    cursor = db[collection].find(query)

    # Expand the cursor and construct the DataFrame
    df =  pd.DataFrame(list(cursor))

    # Delete the _id
    if no_id:
        del df['_id']

    return df

print(username)
# db = _connect_mongo(host='localhost', port='27017', username=username, password=password, db=db)
# print(db)
query = {}

client = MongoClient("mongodb://superuser:qwe-34-vo@127.0.0.1:27017/",
                                 serverSelectionTimeoutMS=2)
# only admin database has users so need to auth with that, then get other dbs
# this will fail if client isn't connected (usually auth fails)
print(client.server_info())
# db = client.get_database('app-db-1')
# print(db)
# cursor = db[collection].find(query)
# # print(list(cursor))
# df =  pd.DataFrame(list(cursor))
# print(df)
# print(read_mongo(db, collection,{},username=username,password=password))
