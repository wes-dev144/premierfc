from flask_restful import Resource
from database.tables.users import User, UserSchema
from database.tables.passwords import Password
from utils import *
from utils.functions import *
from database import db
