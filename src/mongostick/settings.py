import os

from tornado.locale import set_default_locale
from tornado.options import define, parse_command_line

# MongoDB URL
from mongostick.handlers.main import MainHandler

define(
    'mongodb_url',
    default='mongodb://127.0.0.1:27017',
    help='Connection URL to your MongoDB'
)


parse_command_line()

ROOT = os.path.dirname(os.path.abspath(__file__))
frontend_path = os.path.join(ROOT, 'frontend', 'build', )

settings = {
    'debug': False,
    'static_path': os.path.join(frontend_path, 'static'),
    'index_file': os.path.join(frontend_path, 'index.html'),
    'default_handler_class': MainHandler,
}

set_default_locale('en_US')
