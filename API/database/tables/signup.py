from database import *
from utils.utils import random_id
    
class Signup(db.Model):
    __tablename__ = "signup_info"
    _signup_id = db.Column('signup_id', db.String(8), index=True, nullable=False, primary_key=True)
    _user_id = db.Column('user_id', db.String(8), db.ForeignKey('user_info.user_id'), nullable=False)
    _game_id = db.Column('game_id', db.String(8), db.ForeignKey('game_info.game_id'), nullable=False)
    signup_number = db.Column('signup_number', db.Integer, nullable=False)

    def __init__(self, user, game):
        self.set_signup_id()
        self.set_signup_number()
        self._user_id = user.user_id()
        self._game_id = game.game_id()

    def set_signup_id(self):
        self._signup_id = random_id(8)

    def set_signup_number(self):
        self._signup_number = random_id(8)

    @property
    def user_id(self):
        return self._user_id

    @property
    def game_id(self):
        return self._game_id

    @property
    def signup_id(self):
        return self._signup_id

    @property
    def signup_number(self):
        return self._signup_number

    def __repr__(self):
        schema = SignupSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class SignupSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Signup