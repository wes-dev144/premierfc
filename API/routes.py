from utils import *
from flask import Blueprint

from resources.login import *
from resources.users_table import *

def init_routes():
    api_blueprint = Blueprint('api', __name__, url_prefix='/api')
    api = Api(api_blueprint)
    api.add_resource(UserInfo, '/user', '/user/<user_id>')
    api.add_resource(Login, '/login', '/token/<user_id>')
    api.add_resource(UsersList, '/users')
    api.add_resource(ApiKey, '/apikey')
    return api_blueprint