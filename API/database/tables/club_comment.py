from database import *
from utils.utils import random_id

class ClubComment(db.Model):
    __tablename__ = "club_comment"
    _club_comment_id = db.Column('club_comment_id', db.String(8), index=True, nullable=False, primary_key=True)
    _club_id = db.Column('club_id', db.String(8), db.ForeignKey('club_info.club_id'), nullable=False)
    _user_id = db.Column('user_id', db.String(8), db.ForeignKey('user_info.user_id'), nullable=False)
    _publish_date = db.Column('publish_date', db.DateTime, default=db.func.now())
    comment = db.Column(db.Text)

    def __init__(self, user_id, club_id, comment):
        self._club_comment_id = random_id(8)
        self._user_id = user_id
        self._club_id = club_id
        self._publish_date = datetime.datetime.utcnow()
        self.comment = comment
        
    @property
    def club_comment_id(self):
        return self._club_comment_id

    @property
    def publish_date(self):
        return self._publish_date

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