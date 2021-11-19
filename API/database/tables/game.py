from database import *
from utils.utils import random_id
from enum import Enum

class MatchStatus(str, Enum):
    SCHEDULED = "SCHEDULED"
    STARTED = "STARTED"
    CANCELED = "CANCELED"
    PENDING = "PENDING"
    DELAYED = "DELAYED"
    RESCHEDULED = "RESCHEDULED"

class WeekDay(str, Enum):
    MON = "MON"
    TUE = "TUE"
    WED = "WED"
    THU = "THU"
    FRI = "FRI"
    SAT = "SAT"
    SUN = "SUN"

class MatchType(str, Enum):
    FOUR_VS_FOUR = "FOUR_VS_FOUR"
    FIVE_VS_FIVE = "FIVE_VS_FIVE"
    SIX_VS_SIX = "SIX_VS_SIX"
    SEVEN_VS_SEVEN = "SEVEN_VS_SEVEN"
    EIGHT_VS_EIGHT = "EIGHT_VS_EIGHT"
    NINE_VS_NINE = "NINE_VS_NINE"
    TEN_VS_TEN = "TEN_VS_TEN"
    ELEVEN_VS_ELEVEN = "ELEVEN_VS_ELEVEN"
    TWELVE_VS_TWELVE = "TWELVE_VS_TWELVE"
    THIRTEEN_VS_THIRTEEN = "THIRTEEN_VS_THIRTEEN"

class Game(db.Model):
    __tablename__ = "game_info"
    _game_id = db.Column('game_id', db.String(8), index=True, nullable=False, primary_key=True)
    _series_id = db.Column('series_id', db.String(8), db.ForeignKey('series_info.series_id', ondelete="CASCADE"), nullable=False)
    _date = db.Column('date', db.Date)
    _start_time = db.Column('start_time', db.Time)
    _end_time = db.Column('end_time', db.Time)
    _signup_time = db.Column('signup_time', db.Time)
    max_size = db.Column('max_size', db.Integer, nullable=False)
    signup_day = db.Column(db.Enum(WeekDay, name="WEEKDAY"), nullable=False)
    match_status = db.Column(db.Enum(MatchStatus, name="MATCH_STATUS"), default=MatchStatus.SCHEDULED, nullable=False)
    match_type = db.Column(db.Enum(MatchType, name="MATCH_TYPE"), default=MatchType.ELEVEN_VS_ELEVEN, nullable=False)
    address = db.Column(db.Text)
    place_id = db.Column(db.String(28), nullable=False)

    def __init__(self, series_id, address, place_id, game_date, start_time, end_time, 
                    match_status=MatchStatus.SCHEDULED, match_type=MatchType.ELEVEN_VS_ELEVEN, max_size=22):
        self._series_id = series_id
        self._game_id = random_id(8)
        self.address = address
        self.place_id = place_id
        self.date = game_date
        self.start_time = start_time
        self.end_time = end_time

        # Signup time starts 24 hours before. So we can use the same time here. The day will be subtracted though.
        self.signup_time = start_time
        self.signup_day = self.convert_dt(self.date - datetime.timedelta(days=1))
        self.match_status = match_status
        self.match_type = match_type
        self.max_size = max_size

    def convert_dt(self, datetime_obj):
        weekday_mapping = {
            0: WeekDay.MON,
            1: WeekDay.TUE,
            2: WeekDay.WED,
            3: WeekDay.THU,
            4: WeekDay.FRI,
            5: WeekDay.SAT,
            6: WeekDay.SUN
        }
        return weekday_mapping[datetime_obj.weekday()]

    @property
    def series_id(self):
        return self._series_id

    @property
    def game_id(self):
        return self._game_id

    @property
    def date(self):
        return self._date

    @date.setter
    def date(self, date):
        self._date = datetime.datetime.strptime(date, '%m-%d-%Y')

    @property
    def start_time(self):
        return self._start_time

    @start_time.setter
    def start_time(self, time):
        self._start_time = datetime.time.fromisoformat(time)

    @property
    def end_time(self):
        return self._end_time

    @end_time.setter
    def end_time(self, time):
        self._end_time = datetime.time.fromisoformat(time)

    @property
    def signup_time(self):
        return self._signup_time

    @signup_time.setter
    def signup_time(self, time):
        self._signup_time = datetime.time.fromisoformat(time)

class GameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Game