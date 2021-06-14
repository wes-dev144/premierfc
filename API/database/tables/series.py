from database import *
from database.tables.locations import get_city_state
from utils.utils import random_id

class Series(db.Model):
    __tablename__ = "series"
    _series_id = db.Column('series_id', db.String(8), index=True, nullable=False, primary_key=True)
    user_id = db.Column('user_id', db.String(8), db.ForeignKey('users.user_id'), nullable=False)
    club_id = db.Column('club_id', db.String(8), db.ForeignKey('club.club_id'), nullable=False)
    start_date = db.Column('start_date', db.DateTime, default=db.func.now())
    repetition = db.Column('repetition', db.Integer, default=1)
    _monday = db.Column('monday', db.Boolean, default=False)
    _tuesday = db.Column('tuesday', db.Boolean, default=False)
    _wednesday = db.Column('wednesday', db.Boolean, default=False)
    _thursday = db.Column('thursday', db.Boolean, default=False)
    _friday = db.Column('friday', db.Boolean, default=False)
    _saturday = db.Column('saturday', db.Boolean, default=False)
    _sunday = db.Column('sunday', db.Boolean, default=False)
    is_recurring = db.Column('is_recurring', db.Boolean, default=False)

    def __init__(self, user, club):
        self.set_series_id()
        self.user_id = user.user_id()
        self.club_id = club.club_id()

    def set_start_date(self,date):
        self.start_date = date
   
    def set_series_id(self):
        self._series_id = random_id(8)
   
    def set_repetition(self,recurrence):
        self.repetition = recurrence

    def toggel_monday(self):
        self._monday = not self._monday

    def toggel_tuesday(self):
        self._tuesday = not self._tuesday
    
    def toggel_wednesday(self):
        self._wednesday = not self._wednesday

    def toggel_thursday(self):
        self._thursday = not self._thursday

    def toggel_friday(self):
        self._friday = not self._friday

    def toggel_saturday(self):
        self._saturday = not self._saturday

    def toggel_sunday(self):
        self._sunday = not self._sunday
   
    def toggel_recurring(self):
        self.is_recurring = not self.is_recurring

    @property
    def series_id(self):
        return self._series_id
    
    @property
    def user_id(self):
        return self.user_id

    @property
    def club_id(self):
        return self.club_id

    @property
    def repetiton(self):
        return self.repetition

    @property
    def monday(self):
        return self._monday

    @property
    def tuesday(self):
        return self._tuesday

    @property
    def wednesday(self):
        return self._wednesday

    @property
    def thursday(self):
        return self._thursday

    @property
    def friday(self):
        return self._friday

    @property
    def saturday(self):
        return self._saturday

    @property
    def sunday(self):
        return self._sunday

    @property
    def name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def date_created(self):
        return self._date_created

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