from database import *
from utils.utils import random_id
from enum import Enum

class Reccurence(Enum):
    ONCE = "ONCE"
    WEEKLY = "WEEKLY"
    EVERY_OTHER_WEEK = "EVERY_OTHER_WEEK"
    TWO_WEEKS = "TWO_WEEKS"
    THREE_WEEKS = "THREE_WEEKS"
    MONTHLY = "MONTHLY"

class Series(db.Model):
    __tablename__ = "series_info"
    _series_id = db.Column('series_id', db.String(8), index=True, nullable=False, primary_key=True)
    _user_id = db.Column('user_id', db.String(28), db.ForeignKey('user_info.user_id'), nullable=False)
    _club_id = db.Column('club_id', db.String(8), db.ForeignKey('club_info.club_id'), nullable=False)
    _start_date = db.Column('start_date', db.Date)
    _end_date = db.Column('end_date', db.Date)
    reccurence = db.Column(db.Enum(Reccurence, name="RECURRENCE"))
    monday = db.Column(db.Boolean, default=False)
    tuesday = db.Column(db.Boolean, default=False)
    wednesday = db.Column(db.Boolean, default=False)
    thursday = db.Column(db.Boolean, default=False)
    friday = db.Column(db.Boolean, default=False)
    saturday = db.Column(db.Boolean, default=False)
    sunday = db.Column(db.Boolean, default=False)

    def __init__(self, user_id, club_id, start_date, end_date, reccurence=Reccurence.ONCE):
        self._series_id = random_id(8)
        self._user_id = user_id
        self._club_id = club_id
        self.start_date = start_date
        self.end_date = end_date
        self.monday = False
        self.tuesday = False
        self.wednesday = False
        self.thursday = False
        self.friday = False
        self.saturday = False
        self.sunday = False
        self.reccurence = reccurence

    @property
    def start_date(self):
        return self._start_date

    @start_date.setter
    def start_date(self, date):
        self._start_date = datetime.datetime.strptime(date, '%m-%d-%Y')

    @property
    def end_date(self):
        return self._end_date

    @end_date.setter
    def end_date(self, date):
        self._end_date = datetime.datetime.strptime(date, '%m-%d-%Y')

    @property
    def series_id(self):
        return self._series_id

    @property
    def user_id(self):
        return self._user_id

    @property
    def club_id(self):
        return self._club_id

    def __repr__(self):
        schema = SeriesSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class SeriesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Series