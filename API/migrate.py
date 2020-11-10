#!/bin/env
from utils import *
from app import init_app
from database.database import db

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

app = init_app()
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
    manager.run()
