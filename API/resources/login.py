from flask_restful import Resource
from database.tables.users import User
from database.tables.passwords import Password
from database import db

import bcrypt

class Login(Resource):
    def get(self, email, passwd):
        print(email, passwd)
        user = User.query.filter(User.email == email).first()
        if user:
            pwd = Password.query.filter(Password.uid == user.uid).first()
            print(pwd.pwd_hash)
            print(passwd.encode('utf-8'), pwd.pwd_hash.encode('utf-8'))
            if bcrypt.checkpw(passwd.encode('utf-8'), pwd.pwd_hash.encode('utf-8')):
                print('True')
            else:
                print('False')
            # return {'passwd': passwd}