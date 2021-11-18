from database import *
from utils.utils import random_id
from enum import Enum

class Role(Enum):
    ORGANIZER = "Organizer"
    PLAYER = "Player"

class User(db.Model):
    __tablename__ = "user_info"
    _user_id = db.Column('user_id', db.String(28), index=True, nullable=False, primary_key=True)
    _api_key = db.Column('api_key', db.String(16), nullable=False)
    _date_of_birth = db.Column('date_of_birth', db.Date, nullable=False)
    _last_updated = db.Column('last_updated', db.DateTime, default=db.func.now(), onupdate=db.func.now())
    _last_logged_in = db.Column('last_logged_in', db.DateTime, default=db.func.now())
    _date_created = db.Column('date_created', db.DateTime, default=db.func.now())
    location = db.Column(db.Text, nullable=False)
    place_id = db.Column(db.String(28), nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False)
    first_name = db.Column(db.String(32), nullable=False)
    last_name = db.Column(db.String(32), nullable=False)
    role = db.Column(db.Enum(Role, name="ROLE"), nullable=False)

    def __init__(self, first_name, last_name, email, dob, location, place_id, user_id, role=Role.PLAYER):
        self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = dob
        self.location = location
        self.place_id = place_id
        self.role = role
        self._api_key = random_id(16)

    @property
    def api_key(self):
        return self._api_key

    @property
    def user_id(self):
        return self._user_id

    @user_id.setter
    def user_id(self, user_id):
        self._user_id = user_id

    @property
    def last_logged_in(self):
        return self._last_logged_in

    def update_last_login(self):
        self._last_logged_in = datetime.datetime.utcnow()

    @property
    def last_updated(self):
        return self._last_updated

    @property
    def date_created(self):
        return self._date_created

    @property
    def date_of_birth(self):
        return self._date_of_birth

    @date_of_birth.setter
    def date_of_birth(self, dob):
        self._date_of_birth = datetime.datetime.strptime(dob, '%m-%d-%Y')

    def __repr__(self):
        schema = UserSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User