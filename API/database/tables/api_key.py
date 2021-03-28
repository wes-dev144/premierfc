from database import *

class APIKey(db.Model):
    __tablename__ = "api_key"
    key = db.Column(db.String(16), primary_key=True)

    def __init__(self, key):
        self.key = key
