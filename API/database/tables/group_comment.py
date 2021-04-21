from database import *
from database.tables.locations import get_city_state
from utils.utils import random_id

class Group_Comment(db.Model):
    __tablename__ = "group_comment"
    _group_comment_id = db.Column('group_comment_id', db.String(8), index=True, nullable=False, primary_key=True)
    _group_id = db.Column('group_id', db.String(8), db.ForeignKey('ugroup.group_id'), nullable=False)
    _user_id = db.Column('user_id', db.String(8), db.ForeignKey('users.user_id'), nullable=False)
    _comment = db.Column(db.Text)
    _date = db.Column('date_created', db.DateTime, default=db.func.now())

    def __init__(self, user, group, comment):
        self.set_group_comment_id()
        self.comment = comment
        self.set_city_state_id()

    @property
    def group_comment_id(self):
        return self._group_comment_id

    def set_group_comment_id(self):
        self._group_id = random_id(8)
    
    @property
    def date_created(self):
        return self._date_created

    @property
    def comment(self):
        return self.comment

    @property
    def group_id(self):
        return self._group_id

    @property
    def user_id(self):
        return self._user_id

#    def __repr__(self):
#        schema = GroupCommentSchema()
#        attributes = schema.dump(self)
#        attributes_string = "<" + type(self).__name__ + ".__repr__("
#        for key, value in attributes.items():
#            attributes_string += value + ", "
#
#        attributes_string = attributes_string.strip().strip(",") + ")>"
#        return attributes_string

#class GroupCommentSchema(ma.SQLAlchemyAutoSchema):
#    class Meta:
#        model = GroupComment