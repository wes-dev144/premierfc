from database import *
from utils.utils import random_id
from enum import Enum

class RelationshipStatus(Enum):
    FRIEND = "Friend"
    FRIEND_REQUESTED = "Friend Requested"
    BLOCKED = "Blocked"

class UserRelationship(db.Model):
    __tablename__ = "user_role"
    relationship_id = db.Column('relationship_id', db.String(8), nullable=False, primary_key=True)
    primary_user = db.Column('primary_user_id', db.String(8), db.ForeignKey('users.user_id'), nullable=False, primary_key=True)
    related_user = db.Column('related_user_id', db.String(8), db.ForeignKey('users.user_id'), nullable=False)
    relationship_status = db.Column(db.Enum(RelationshipStatus, name="RELATIONSHIP_STATUS"), nullable=False)

    def __init__(self, p_user, r_user, status=RelationshipStatus.FRIEND_REQUESTED):
        self.set_relationship_id()
        self.primary_user = p_user.user_id()
        self.related_user = r_user.user_id()
        self.relationship_status = status

    @property
    def relationship(self):
        return self.relationship

    @property
    def relationship_id(self):
        return self.relationship_id

    def set_relationship_id(self):
        self.relationship_id = random_id(8)

    def __repr__(self):
        schema = RelationshipSchema()
        attributes = schema.dump(self)
        attributes_string = "<" + type(self).__name__ + ".__repr__("
        for key, value in attributes.items():
            attributes_string += value + ", "

        attributes_string = attributes_string.strip().strip(",") + ")>"
        return attributes_string

class RelationshipSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserRelationship
