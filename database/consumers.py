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
        # print(dir(self))
        # print(self.__dict__)
        # print(reverse('goodgood'))
        async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)("chat", self.channel_name)
        pass

        # receives messages from its client, and echos those messages back to the same client.
        # For now it does not broadcast messages to other clients in the same room.
    def receive(self, text_data):
        # expecting text_data to be sent in string form
        print(text_data)
        text_data_json = json.loads(text_data)

        # # this only sends to one consumer aka the one that established the channel via websocket
        self.send(json.dumps({
            'message': 'recieved and echoed back'
        }))
        async_to_sync(self.channel_layer.group_send)(
            "chat",
            {
                "type": "chat.message",
                "update": text_data_json['update'],
            },
        )

    def chat_message(self, event):
        print(event)
        if event.update:
            self.send(json.dumps({
                'message': 'you need to refresh'
            }))
        #  await self.send_json(
        #     {
        #         "msg_type": settings.MSG_TYPE_ENTER,
        #         "room": event["room_id"],
        #         "username": event["username"],
        #     },
        # )
