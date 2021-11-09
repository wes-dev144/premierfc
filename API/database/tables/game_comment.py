from database import *
from database.tables.locations import get_city_state
from utils.utils import random_id

class GameComment(db.Model):
    __tablename__ = "game_comment"
    _game_comment_id = db.Column('game_comment_id', db.String(8), index=True, nullable=False, primary_key=True)
    _game_id = db.Column('game_id', db.String(8), db.ForeignKey('game_info.game_id'), nullable=False)
    _user_id = db.Column('user_id', db.String(8), db.ForeignKey('user_info.user_id'), nullable=False)
    _comment = db.Column(db.Text)
    _publish_date = db.Column('publish_date', db.DateTime, default=db.func.now())
    _publish_time = db.Column('publish_time', db.DateTime, default=db.func.now())

    def __init__(self, user, game, comment):
        self.set_comment_id()
        self.comment = comment
        self._user_id = user.user_id()
        self._game_id = game.game_id()

    @property
    def game_comment_id(self):
        return self._game_comment_id

    def set_comment_id(self):
        self._game_comment_id = random_id(8)
    
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