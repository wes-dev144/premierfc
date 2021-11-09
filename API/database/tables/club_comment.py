from database import *
from database.tables.locations import get_city_state
from utils.utils import random_id

class ClubComment(db.Model):
    __tablename__ = "club_comment"
    _club_comment_id = db.Column('club_comment_id', db.String(8), index=True, nullable=False, primary_key=True)
    _club_id = db.Column('club_id', db.String(8), db.ForeignKey('club_info.club_id'), nullable=False)
    _user_id = db.Column('user_id', db.String(8), db.ForeignKey('user_info.user_id'), nullable=False)
    _comment = db.Column(db.Text)
    _publish_date = db.Column('publish_date', db.DateTime, default=db.func.now())
    _publish_time = db.Column('publish_time', db.DateTime, default=db.func.now())

    def __init__(self, user, club, comment):
        self.set_club_comment_id()
        self.comment = comment
        self.set_city_state_id()
        self._user_id = user.user_id()
        self._club_id = club.club_id()

    @property
    def club_comment_id(self):
        return self._club_comment_id

    def set_comment_id(self):
        self._club_comment_id = random_id(8)
    
    @property
    def publish_date(self):
        return self._publish_date

    @property
    def publish_time(self):
        return self._publish_time

    @property
    def comment(self):
        return self.comment

    @property
    def club_id(self):
        return self._club_id

    @property
    def user_id(self):
        return self._user_id

    def __repr__(self):
        schema = ClubCommentSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class ClubCommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ClubComment