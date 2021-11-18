from database import *
from utils.utils import random_id
from enum import Enum

class RelationshipStatus(Enum):
    FRIEND = "FRIEND"
    REQUESTED = "REQUESTED"
    BLOCKED = "BLOCKED"

class UserRelationship(db.Model):
    __tablename__ = "user_relationship"
    _relationship_id = db.Column('relationship_id', db.String(8), nullable=False, primary_key=True)
    _primary_user_id = db.Column('primary_user_id', db.String(8), db.ForeignKey('user_info.user_id'), nullable=False, primary_key=True)
    _related_user_id = db.Column('related_user_id', db.String(8), db.ForeignKey('user_info.user_id'), nullable=False)
    relationship_status = db.Column(db.Enum(RelationshipStatus, name="RELATIONSHIP_STATUS"), nullable=False)

    def __init__(self, primary_id, secondary_id, status=RelationshipStatus.REQUESTED):
        self._relationship_id = random_id(8)
        self._primary_user_id = primary_id
        self._related_user_id = secondary_id
        self.relationship_status = status

    @property
    def relationship_id(self):
        return self._relationship_id

    @property
    def primary_user_id(self):
        return self._primary_user_id

    @property
    def related_user_id(self):
        return self._related_user_id

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
