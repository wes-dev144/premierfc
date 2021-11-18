from database import *
from utils.utils import random_id

class GameComment(db.Model):
    __tablename__ = "game_comment"
    _game_comment_id = db.Column('game_comment_id', db.String(8), index=True, nullable=False, primary_key=True)
    _game_id = db.Column('game_id', db.String(8), db.ForeignKey('game_info.game_id'), nullable=False)
    _user_id = db.Column('user_id', db.String(8), db.ForeignKey('user_info.user_id'), nullable=False)
    _publish_date = db.Column('publish_date', db.DateTime, default=db.func.now())
    comment = db.Column(db.Text)

    def __init__(self, user_id, game_id, comment):
        self._game_comment_id = random_id(8)
        self._user_id = user_id
        self._game_id = game_id
        self._publish_date = datetime.datetime.utcnow()
        self.comment = comment

    @property
    def game_comment_id(self):
        return self._game_comment_id

    @property
    def publish_date(self):
        return self._publish_date

    @property
    def game_id(self):
        return self._game_id

    @property
    def user_id(self):
        return self._user_id

    def __repr__(self):
        schema = GameCommentSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class GameCommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = GameComment