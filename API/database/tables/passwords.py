from database import *
import bcrypt

class Password(db.Model):
    __tablename__ = "passwords"
    id = db.Column(db.Integer(), primary_key=True)
    uid = db.Column(db.String(8), db.ForeignKey('users.uid'))
    pwd_hash = db.Column(db.String(64))

    def __init__(self, uid, pwd_hash):
        self.uid = uid
        self.pwd_hash = bcrypt.hashpw(pwd_hash.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')