#!/bin/env
from utils import *
from database import db
from config.config import Config
from routes import init_routes

def init_app(app):
    app.config.from_object(Config)
    api_blueprint = init_routes()
    app.register_blueprint(api_blueprint)
    db.init_app(app)
    return app

app = Flask(__name__)
init_app(app)

if __name__ == "__main__":
    app.run(debug=True)