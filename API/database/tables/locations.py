from database import *
# Database data from: https://simplemaps.com/data/us-zips.

class MissingCityStateID(Exception):
    def __init__(self, message="Cannot Find City/State"):
        super().__init__(message)

class PostalCode(db.Model):
    __tablename__ = "postal_code"
    zip_code = db.Column(db.Integer, index=True, nullable=False, primary_key=True)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)
    timezone = db.Column(db.String(64), nullable=False)
    city_state_id = db.Column(db.Integer, db.ForeignKey('city_state.city_state_id'), nullable=False)
    state_id = db.Column(db.Integer, db.ForeignKey('state.state_id'), nullable=False)

    def __init__(self, zip_code, lat, long, timezone, city_state_id, state_id):
        self.zip_code = zip_code
        self.lat = lat
        self.long = long
        self.timezone = timezone
        self.city_state_id = city_state_id
        self.state_id = state_id

class State(db.Model):
    __tablename__ = "state"
    state_id = db.Column(db.Integer, nullable=False, primary_key=True)
    code = db.Column(db.String(2), nullable=False)
    name = db.Column(db.String(64), nullable=False)

    def __init__(self, state_id, name, code):
        self.state_id = state_id
        self.name = name
        self.code = code

class City(db.Model):
    __tablename__ = "city_state"
    city_state_id = db.Column(db.Integer, index=True, nullable=False, primary_key=True)
    state_id = db.Column(db.Integer, db.ForeignKey('state.state_id'), nullable=False)
    name = db.Column(db.String(64))

    def __init__(self, city_state_id, state_id, name):
        self.city_state_id = city_state_id
        self.state_id = state_id
        self.name = name

def get_city_state(city_name, state_name, return_all=False):
    cities = City.query.filter(City.name == city_name).join(State).filter(State.name == state_name).all()
    if not cities:
        raise MissingCityStateID
    if return_all:
        return cities
    else:
        return cities[0]

