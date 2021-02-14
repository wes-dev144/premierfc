
from . import *
import bcrypt
import jwt

class Login(Resource):
    def get(self, uid):
        user = User.query.filter(User.uid == uid).first()
        if user:
            auth_token = self.generate_token(uid)
            return {"auth_token": auth_token}
        else:
            return json_message("Unregistered UID"), 401

    @validate_json('email', 'passwd')
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.email == data['email']).first()
        if user:
            pwd = Password.query.filter(Password.uid == user.uid).first()
            if bcrypt.checkpw(data['passwd'].encode('utf-8'), pwd.pwd_hash.encode('utf-8')):
                schema = UserSchema()
                auth_token = self.generate_token(user.uid)
                return {"user_data": schema.dump(user), "auth_token": auth_token}
            else:
                return json_message("Invalid Email/Password"), 401
    
    def generate_token(self, uid):
        return jwt.encode({'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, os.environ.get("API_KEY"))