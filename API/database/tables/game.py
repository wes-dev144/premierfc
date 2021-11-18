from database import *
from utils.utils import random_id
from enum import Enum

class MatchStatus(Enum):
    SCHEDULED = "SCHEDULED"
    STARTED = "STARTED"
    CANCELED = "CANCELED"
    PENDING = "PENDING"
    DELAYED = "DELAYED"
    RESCHEDULED = "RESCHEDULED"

class Game(db.Model):
    __tablename__ = "game_info"
    _game_id = db.Column('game_id', db.String(8), index=True, nullable=False, primary_key=True)
    _series_id = db.Column('series_id', db.String(8), db.ForeignKey('series_info.series_id'), nullable=False)
    _game_date = db.Column(db.Date)
    _game_time = db.Column(db.Time)
    match_status = db.Column(db.Enum(MatchStatus, name="MATCH_STATUS"), default=MatchStatus.SCHEDULED, nullable=False)
    address = db.Column(db.Text)
    place_id = db.Column(db.String(28), nullable=False)

    def __init__(self, series_id, address, place_id, game_date, game_time):
        self._series_id = series_id
        self._game_id = random_id(8)
        self.address = address
        self.place_id = place_id
        self.game_date = game_date
        self.game_time = game_time
        self.match_status = MatchStatus.SCHEDULED
    
    @property
    def series_id(self):
        return self._series_id

    @property
    def game_id(self):
        return self._game_id

    @property
    def game_date(self):
        return self._game_date

    @game_date.setter
    def game_date(self, game_date):
        self._game_date = datetime.datetime.strptime(game_date, '%m-%d-%Y')

    @property
    def game_time(self):
        return self._game_time

    @game_time.setter
    def game_time(self, game_time):
        self._game_time = datetime.time.strptime(game_time, "%I:%M %p")


    def __repr__(self):
        schema = GameSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class GameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Game