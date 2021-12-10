from sqlalchemy import Integer
from database import *
from enum import Enum

class ClubRoles(str, Enum):
    PRESIDENT = "PRESIDENT"
    MANAGER = "MANAGER"
    PLAYER = "PLAYER"
    
class ClubMember(db.Model):
    __tablename__ = "club_member"
    _id = db.Column('id', Integer, index=True, primary_key=True)
    _user_id = db.Column('user_id', db.String(28), db.ForeignKey('user_info.user_id', ondelete="CASCADE"), nullable=False)
    _club_id = db.Column('club_id', db.String(8), db.ForeignKey('club_info.club_id', ondelete="CASCADE"), nullable=False)
    role = db.Column(db.Enum(ClubRoles, name="CLUB_ROLE"), nullable=False)

    def __init__(self, user_id, club_id, role=ClubRoles.PLAYER):
        self._user_id = user_id
        self._club_id = club_id
        self.role = role

    @property
    def user_id(self):
        return self._user_id

    @property
    def club_id(self):
        return self._club_id

class UserClubSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ClubMember