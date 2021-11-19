from utils import *
from flask import Blueprint

from resources.login import *
from resources.users_table import *
from resources.series import *
from resources.clubs import *

def init_routes():
    api_blueprint = Blueprint('api', __name__, url_prefix='/api')
    api = Api(api_blueprint)
    api.add_resource(UserInfo, '/user', '/user/<user_id>')
    api.add_resource(Login, '/login', '/token/<user_id>')
    api.add_resource(UsersList, '/users')
    api.add_resource(ApiKey, '/apikey')
    api.add_resource(UserClubsList, '/user/<user_id>/clubs')
    api.add_resource(SeriesGamesList, '/series/<series_id>/games')
    api.add_resource(ClubsList, '/clubs')

    #TODO: create route to get user relationship 

    # api.add_resource(GameInfo, '/game', '/game/<game_id>')
    # api.add_resource(GamesList, '/games')

    return api_blueprint