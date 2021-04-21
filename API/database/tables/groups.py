from database import *
from database.tables.locations import get_city_state
from utils.utils import random_id

class Group(db.Model):
    __tablename__ = "ugroup"
    _group_id = db.Column('group_id', db.String(8), index=True, nullable=False, primary_key=True)
    name = db.Column(db.String(8))
    user_id = db.Column('user_id', db.String(8), db.ForeignKey('users.user_id'), nullable=False)
    _city_state_id = db.Column('city_state_id', db.Integer, db.ForeignKey('city_state.city_state_id'), nullable=False)
    _date_created = db.Column('date_created', db.DateTime, default=db.func.now())


    def __init__(self, name, city, state):
        self.set_group_id()
        self.name = name
        self._city = city
        self._state = state
        self.set_city_state_id()

    @property
    def group_id(self):
        return self._group_id

    def set_group_id(self):
        self._group_id = random_id(8)

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
        schema = GroupSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class GroupSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Group