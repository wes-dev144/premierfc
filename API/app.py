#!/bin/env
from utils import *
from database import db
from config.config import Config
from routes import init_routes
from flask_migrate import Migrate
from database.tables import *

def init_app(app):
    app.config.from_object(Config)
    api_blueprint = init_routes()
    app.register_blueprint(api_blueprint)
    db.init_app(app)
    return app

app = Flask(__name__)
init_app(app)
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)