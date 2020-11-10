from utils import *
db = SQLAlchemy()
ma = Marshmallow()

class User(db.Model):
    __tablename__ = "users"
    uid = db.Column(db.String(8), primary_key=True)
    api_key = db.Column(db.String(8))
    date_created = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    email = db.Column(db.String(64), index=True, unique=True)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32), index=True)
    last_accessed = db.Column(db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())
    date_of_birth = db.Column(db.Date)
    country = db.Column(db.String(32))
    city = db.Column(db.String(32))
    state = db.Column(db.String(32))

    def __init__(self, uid):
        self.uid = uid
        self.api_key = ''
        self.date_created = datetime.datetime.now()
        self.email = ''
        self.first_name = ''
        self.last_name = ''
        self.last_accessed = datetime.datetime.now()
        self.date_of_birth = ''
        self.country = ''
        self.city = ''
        self.state = ''

class UserSchema(ma.Schema):
    uid = fields.String(dump_only=True)
    api_key = fields.String(dump_only=True)
    date_created = fields.DateTime()
    email = fields.String()
    first_name = fields.String()
    last_name = fields.String()
    last_accessed = fields.DateTime()
    date_of_birth = fields.Date()
    country = fields.String()
    city = fields.String()
    state = fields.String()