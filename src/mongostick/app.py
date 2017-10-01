import tornado.ioloop
import tornado.log
import tornado.web

from mongostick.settings import settings
from mongostick.handlers.base_websocket import BaseWebsocketHandler
from mongostick.lib.mongo_scheduler import MongoDBScheduler


def make_app():
    return tornado.web.Application(
        [
            (r"/ws", BaseWebsocketHandler),
            (r'/índex.html', tornado.web.StaticFileHandler, {'path': settings['index_file']}),
            (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': settings['static_path']}),
        ],
        **settings
    )


def main():
    app = make_app()
    app.listen(8888)
    main_loop = tornado.ioloop.IOLoop.instance()
    mongodb_scheduler = MongoDBScheduler()
    main_loop.spawn_callback(mongodb_scheduler.update_replica_info)
    main_loop.spawn_callback(mongodb_scheduler.update_data)
    tornado.log.gen_log.info('MongoStick has started!')
    tornado.log.gen_log.info('Have fun poking around.')
    main_loop.start()


if __name__ == "__main__":
    main()
