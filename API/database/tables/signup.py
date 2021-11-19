from database import *
from utils.utils import random_id
    
class Signup(db.Model):
    __tablename__ = "signup_info"
    _signup_id = db.Column('signup_id', db.String(8), index=True, nullable=False, primary_key=True)
    _user_id = db.Column('user_id', db.String(28), db.ForeignKey('user_info.user_id', ondelete="CASCADE"), nullable=False)
    _game_id = db.Column('game_id', db.String(8), db.ForeignKey('game_info.game_id', ondelete="CASCADE"), nullable=False)
    _queue_position = db.Column('queue_position', db.Integer, nullable=False)

    def __init__(self, user_id, game_id, queue_position):
        self._signup_id = random_id(8)
        self._queue_position = queue_position
        self._user_id = user_id
        self._game_id = game_id

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
        return self._queue_position

class SignupSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Signup