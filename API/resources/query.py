from flask_restful import Resource
from database.tables.users import User, UserSchema
from database.tables.passwords import Password
from database import db

class Query(Resource):
    def get(self, uid):
        user = User.query.filter(User.uid == uid).first()
        if user:
            schema = UserSchema()
            return schema.dump(user)
        else:
            return "ERROR: USER NOT FOUND"

    def put(self, firstname, lastname, email, dob, passwd):
        user = User(firstname, lastname, email, dob)
        db.session.add(user)
        db.session.commit()
        passwd = Password(user.uid, passwd)
        db.session.add(passwd)
        db.session.commit()
        return "Added: " + user.__repr__()

    def patch(self, uid, attribute, value):
        user = User.query.filter(User.uid == uid).first()
        if user:
            if hasattr(user, attribute):
                setattr(user, attribute, value)
                db.session.commit()
                return "Updated User!"
            else:
                return "ERROR: CANNOT SET " + attribute
        else:
            return "ERROR: USER NOT FOUND"