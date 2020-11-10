#!/bin/env
from utils import *
from database.database import db
from config.config import Config

def init_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    #api = Api(app)
    db.init_app(app)
    return app

class Hellworld(Resource):
    def get(self):
        return {"data":"hello world"}
    _id = db.Column(db.String)

# api.add_resource(Hellworld, "/helloworld")

if __name__ == "__main__":
    app = init_app()
    app.run(debug=True)