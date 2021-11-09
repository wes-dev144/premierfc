from database import *
from database.tables.locations import get_city_state
from utils.utils import random_id
from enum import Enum

class ClubStatus(Enum):
    ACTIVE = "ACTIVE"
    RETIRED = "RETIRED"

class Club(db.Model):
    __tablename__ = "club_info"
    _club_id = db.Column('club_id', db.String(8), index=True, nullable=False, primary_key=True)
    name = db.Column(db.String(32))
    owner_id = db.Column('owner_id', db.String(28), db.ForeignKey('user_info.user_id'), nullable=False)
    _city_state_id = db.Column('city_state_id', db.Integer, db.ForeignKey('city_state.city_state_id'), nullable=False)
    _date_created = db.Column('date_created', db.DateTime, default=db.func.now())
    _last_accessed = db.Column('last_accessed', db.DateTime, default=db.func.now())
    club_status = db.Column(db.Enum(ClubStatus, name="CLUB_STATUS"), nullable=False)

    def __init__(self, name, city, state, owner_id):
        self.set_club_id()
        self.name = name
        self.owner_id = owner_id
        self._city = city
        self._state = state
        self.set_city_state_id()
        self.last_accessed()
        self.club_status = ClubStatus.ACTIVE

    @property
    def get_last_accessed(self):
        return self._last_accessed

    @property
    def get_club_status(self):
        return self._club_status

    def last_accessed(self):
        self._last_accessed = db.func.now()

    @property
    def club_id(self):
        return self._club_id

    def set_club_id(self):
        self._club_id = random_id(8)

    @property
    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    @property
    def city(self):
        return self._city
    
    @city.setter
    def city(self, city):
        self._city = city
        self.set_city_state_id()

    @property
    def state(self):
        return self._state
    
    @state.setter
    def state(self, state):
        self._state = state
        self.set_city_state_id()

    @property
    def city_state_id(self):
        return self._city_state_id    

    def set_city_state_id(self):
        city_state = get_city_state(self.city, self.state)
        self._city_state_id = city_state.city_state_id

    def date_created(self):
        return self._date_created

    def __repr__(self):
        schema = ClubSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class ClubSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Club