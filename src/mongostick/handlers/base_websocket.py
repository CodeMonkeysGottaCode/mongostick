from tornado.ioloop import PeriodicCallback
from tornado.websocket import WebSocketHandler

from mongostick.lib.mongo_scheduler import MongoDBScheduler


class BaseWebsocketHandler(WebSocketHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.scheduler = MongoDBScheduler()
        self.callback = None

    def send_data(self):
        self.write_message(self.scheduler.replica_set_info)
        self.write_message(self.scheduler.operations)
        self.write_message(self.scheduler.databases)

    def on_message(self, message):
        pass

    def data_received(self, chunk):
        pass

    def open(self, *args, **kwargs):
        self.send_data()
        self.callback = PeriodicCallback(self.send_data, 1 * 1000 * 10)
        self.callback.start()

    def check_origin(self, origin):
        return True

    def on_close(self):
        self.callback.stop()
