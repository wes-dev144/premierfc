from database import *
from utils.utils import random_id

class User(db.Model):
    __tablename__ = "users"
    uid = db.Column(db.String(8), primary_key=True)
    api_key = db.Column(db.String(16))
    date_created = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    email = db.Column(db.String(64), index=True, unique=True)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32), index=True)
    last_accessed = db.Column(db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())
    date_of_birth = db.Column(db.Date)
    country = db.Column(db.String(32))
    city = db.Column(db.String(32))
    state = db.Column(db.String(32))

    def __init__(self, first_name, last_name, email, dob):
        self.uid = random_id(8)
        self.api_key = random_id(16)
        self.date_created = datetime.datetime.utcnow()
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.last_accessed = datetime.datetime.utcnow()
        self.date_of_birth = datetime.datetime.strptime(dob, '%Y-%m-%d')
        self.country = ''
        self.city = ''
        self.state = ''

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