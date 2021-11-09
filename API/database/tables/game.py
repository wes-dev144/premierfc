from database import *
from database.tables.locations import get_city_state
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
    _address = db.Column(db.Text)
    game_date = db.Column(db.DateTime, default=db.func.now())
    game_time = db.Column(db.DateTime, default=db.func.now())
    match_status = db.Column(db.Enum(MatchStatus), default=MatchStatus.SCHEDULED, nullable=False)
    postalcode = db.Column(db.Integer, db.ForeignKey('postal_code.zip_code'), nullable=False)

    def __init__(self, series_id, address, game_date, game_time, postalcode):
        self.set_game_id()
        self._series_id = series_id
        self._address = address
        self.game_date = game_date
        self.game_time = game_time
        self.postalcode = postalcode
        self.scheduled()

    @property
    def game_id(self):
        return self._game_id

    def set_game_id(self):
        self._game_id = random_id(8)

    @property
    def game_date(self):
        return self.game_date

    #need decorator to check validity of date given
    def update_game_date(self, game_date):
        self.game_date = game_date

    @property
    def game_time(self):
        return self.game_time

    #need decorator to check validity of time given
    def update_game_time(self, game_time):
        self.game_time = game_time

    @property
    def date_created(self):
        return self._date_created

    @property
    def date_of_birth(self):
        return self._date_of_birth

    @date_of_birth.setter
    def date_of_birth(self, dob):
        self._date_of_birth = datetime.datetime.strptime(dob, '%Y-%m-%d')

    @property
    def user_role(self):
        return self.user_role

    def scheduled(self):
        self.match_status = MatchStatus.SCHEDULED

    def started(self):
        self.match_status = MatchStatus.STARTED

    def canceled(self):
        self.match_status = MatchStatus.CANCELED

    def pending(self):
        self.match_status = MatchStatus.PENDING

    def delayed(self):
        self.match_status = MatchStatus.DELAYED

    def rescheduled(self):
        self.match_status = MatchStatus.RESCHEDULED

    @property
    def match_status(self):
        return self.match_status

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