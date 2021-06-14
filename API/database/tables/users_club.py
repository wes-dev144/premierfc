from database import *
from utils.utils import random_id
from enum import Enum

class ClubRoles(Enum):
    OWNER = "Owner"
    ADMIN = "Admin"
    PARTICIPANT = "Participant"
    
class UserClub(db.Model):
    __tablename__ = "user_club"
    _user_club_id = db.Column('user_club_id', db.String(8), index=True, nullable=False, primary_key=True)
    _user_id = db.Column('user_id', db.String(8), db.ForeignKey('users.user_id'), nullable=False)
    _club_id = db.Column('club_id', db.String(8), db.ForeignKey('club.club_id'), nullable=False)
    club_role = db.Column(db.Enum(ClubRoles), default=ClubRoles.PARTICIPANT, nullable=False)

    def __init__(self, user, club):
        self.set_user_club_id()
        self._user_id = user.user_id()
        self._club_id = club.club_id()
        self.participant()

    def set_user_club_id(self):
        self._user_club_id = random_id(8)

    @property
    def club_role(self):
        return self.club_role

    @property
    def user_id(self):
        return self._user_id

    @property
    def club_id(self):
        return self._club_id

    def owner(self):
        self.club_role = ClubRoles.OWNER

    def admin(self):
        self.club_role = ClubRoles.ADMIN

    def participant(self):
        self.club_role = ClubRoles.PARTICIPANT

    def __repr__(self):
        schema = UserClubSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class UserClubSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserClub