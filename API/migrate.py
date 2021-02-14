#!/bin/env
from utils import *
from app import init_app
from database import db
from database.tables import *

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

app = Flask(__name__)
init_app(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
manager.run()
