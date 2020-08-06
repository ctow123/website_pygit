import json, os, requests, base64
from secerts import consumer_key,consumer_secret,bearer_token
from datetime import date
from requests_oauthlib import OAuth1Session
from pathlib import Path
import sys
print("Usage: python3 twitter_script.py <twitter username>")

# ---- getting user timeline tweets (retweets?)
url = "https://api.twitter.com/oauth2/token"
s = consumer_key + ":" + consumer_secret
base64s = (base64.b64encode(s.encode('utf-8'))).decode('utf-8')
headers = {'Authorization': "Basic " + base64s, "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
data ={"grant_type" : "client_credentials"}
x = requests.post(url, data = data, headers = headers)
test = (x.content).decode('utf-8')
test2 = json.loads(test)
ttoken = test2['access_token']
params = { 'Authorization': 'Bearer ' + bearer_token}

# https://api.twitter.com/1.1/favorites/list.json --- favorites
screenname = sys.argv[1]
filename = screenname + '_' + date.today().strftime("%Y%m%d-%H%M%S")
# filepath = Path('./tweets/' + filename + '.json')
# filepath.touch(exist_ok=True)

maxid = ''
count = 0
print('...collecting...')
while count < 100:
    response = ''
    if maxid is '':
        response = requests.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+ screenname+'&tweet_mode=extended&count=200', headers = params).json()
    else:
        response = requests.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+ screenname+'&max_id='+ maxid+'&tweet_mode=extended&count=200', headers = params).json()
    # print(response)
    if response[-1]['id_str'] == maxid:
        print('done')
        count = 100
    maxid = response[-1]['id_str']
    try:
        # mode = 'a' if os.path.exists('./tweets/' + filename + '.json') else 'none'
        with open(os.getcwd() +'/database/tweets/' + filename + '.json', 'r') as f:
            try:
                list2= json.load(f)
            except:
                list2 = []
                print('errpr')

    except:
        list2 = []
        pass
    dict2 = response+list2
    # mode = 'a+' if os.path.exists('./tweets/' + filename + '.json') else 'w+'
    with open(os.getcwd() +'/database/tweets/' + filename + '.json', 'w+') as f2:
        json.dump(dict2, f2)
    count += 1
