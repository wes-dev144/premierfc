from . import *

class UserInfo(Resource):
    def get(self, uid):
        user = User.query.filter(User.uid == uid).first()
        if user:
            schema = UserSchema()
            return schema.dump(user)
        else:
            return json_message("User Not Found"), 404

    @validate_json('first_name', 'last_name', 'email', 'date_of_birth', 'passwd', 'country', 'state', 'city')
    def put(self):
        data = request.get_json()
        if User.query.filter(User.email == data['email']).first():
            return json_message("Email Has Been Registered"), 403

        user = User(data['first_name'], data['last_name'], data['email'], data['date_of_birth'],
                    data['country'], data['state'], data['city'])
        db.session.add(user)
        db.session.commit()

        passwd = Password(user.uid, data['passwd'])
        db.session.add(passwd)
        db.session.commit()
        
        return json_message("Added: " + user.__repr__())

    @validate_json('uid', 'attribute', 'value')
    def patch(self):
        data = request.get_json()
        user = User.query.filter(User.uid == data['uid']).first()
        if user:
            if hasattr(user, data['attribute']):
                setattr(user, data['attribute'], data['value'])
                db.session.commit()
                return json_message("Updated User")
            else:
                return json_message("Cannot Change Value: " + data['attribute']), 400
        else:
            return json_message("User Not Found"), 404

class UsersList(Resource):
    @validate_json('query_limit', 'offset')
    def get(self):
        data = request.get_json()
        users = User.query.limit(data['query_limit']).offset(data['offset']).all()
        if users:
            schema = UserSchema(many=True)
            return schema.dump(users)
        else:
            return json_message("No Users Found"), 404