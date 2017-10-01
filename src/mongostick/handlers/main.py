import tornado.web


class MainHandler(tornado.web.RequestHandler):
    """
    This handler is used as a default handler in MongoStick.
    The the frontend is a SPA we need to route everything the server cannot
    find to the frontend and handle routing there.
    """
    def get(self):
        self.render('../frontend/build/index.html')
