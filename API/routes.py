from utils import *
from flask import Blueprint

from resources.login import *
from resources.users_table import *

def init_routes():
    api_blueprint = Blueprint('api', __name__, url_prefix='/api')
    api = Api(api_blueprint)
    api.add_resource(UserInfo, '/user', '/user/<uid>')
    api.add_resource(Login, '/login', '/token/<uid>')
    api.add_resource(UsersList, '/users')
    return api_blueprint