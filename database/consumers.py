from channels.generic.websocket import WebsocketConsumer
import json
#  this WebSocket consumer, which is synchronous, so needs the async channel layer functions to be converted.
from asgiref.sync import async_to_sync

# this is a synchronoous consumer, async consumer are better for performance but must be careful
# not to perform blocking operations ex. accessing a django model (SQL query)

class CommentConsumer(WebsocketConsumer):
    # commands = {
    #     'init_chat': init_chat,
    #     'fetch_messages': fetch_messages,
    #     'new_message': new_message
    # }

    def connect(self):
        print("connecting")
        async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)("chat", self.channel_name)
        pass

        # recieves comment and broadcasts it to other users
        # channels allow instances of apps to talk for distrubed application
        # sending events over the channels layer -> meaning on recieve event will find the group (chat) and send the event
        # over the channel layer to that group
    def receive(self, text_data):
        # expecting text_data to be sent in string form
        # print(text_data)
        text_data_json = json.loads(text_data)

        # # this only sends to one consumer aka the one that established the channel via websocket
        # self.send(json.dumps({
        #     'message': 'recieved and echoed back'
        # }))

        async_to_sync(self.channel_layer.group_send)(
            "chat",
            {
                "type": "chat.message",
                "username": text_data_json['username'],
                "comment": text_data_json['comment'],
                "update": text_data_json['update']
            },
        )

# consumer that takes the channel event and turns it into a websocket frame to communicates it to the client
    def chat_message(self, event):
        print(event['comment'])
        if event.update:
            self.send(json.dumps({
                'username':event['username'],
                'comment': event['comment']
            }))
