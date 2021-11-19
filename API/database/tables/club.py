from database import *
from utils.utils import random_id
from enum import Enum

class ClubStatus(str, Enum):
    ACTIVE = "ACTIVE"
    RETIRED = "RETIRED"

class Club(db.Model):
    __tablename__ = "club_info"
    _club_id = db.Column('club_id', db.String(8), index=True, nullable=False, primary_key=True)
    _date_created = db.Column('date_created', db.DateTime, default=db.func.now())
    _last_accessed = db.Column('last_accessed', db.DateTime, default=db.func.now())
    name = db.Column(db.String(32))
    owner_id = db.Column('owner_id', db.String(28), db.ForeignKey('user_info.user_id', ondelete="CASCADE"), nullable=False)
    location = db.Column('location', db.Text)
    place_id = db.Column(db.String(28), nullable=False)
    club_status = db.Column(db.Enum(ClubStatus, name="CLUB_STATUS"), nullable=False)

    def __init__(self, name, location, place_id, owner_id):
        self._club_id = random_id(8)
        self.name = name
        self.owner_id = owner_id
        self.location = location
        self.place_id = place_id
        self._last_accessed = datetime.datetime.utcnow()
        self.club_status = ClubStatus.ACTIVE

    @property
    def last_accessed(self):
        return self._last_accessed

    def update_last_accessed(self):
        self._last_accessed = datetime.datetime.utcnow()

    @property
    def club_id(self):
        return self._club_id

    @property
    def date_created(self):
        return self._date_created

class ClubSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Club