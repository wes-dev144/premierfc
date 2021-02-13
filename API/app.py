#!/bin/env
from utils import *
from database import db
from config.config import Config
from resources.query import Query
from resources.login import Login

def init_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    api = Api(app)
    api.add_resource(Query, 
                    '/query/user/<uid>', 
                    '/query/user/add/<firstname>/<lastname>/<email>/<dob>/<passwd>',
                    '/query/user/update/<uid>/<attribute>/<value>')
    api.add_resource(Login, 
                    '/login/<email>/<passwd>')

    db.init_app(app)
    return app

if __name__ == "__main__":
    app = init_app()
    app.run(debug=True)