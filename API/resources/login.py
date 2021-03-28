
from . import *
import bcrypt
import jwt

class Login(Resource):
    @validate_json('id_token')
    def get(self, user_id):
        data = request.get_json()
        user = User.query.filter(User._user_id == user_id).first()
        if user:
            auth_token = self.generate_token(user.api_key)
            return {"auth_token": auth_token}
        else:
            return json_message("Unregistered UID"), 401

    @validate_json('email')
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.email == data['email']).first()
        if user:
            schema = UserSchema()
            auth_token = self.generate_token(user.api_key)
            return {"user_data": schema.dump(user), "auth_token": auth_token}
        return json_message("Invalid Email/Password"), 401

    def generate_token(self, api_key):
        return jwt.encode({'api_key': api_key, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, os.environ.get("PRIVATE_KEY"))

class ApiKey(Resource):
    def get(self):
        key = APIKey.query.first()
        if key:
            return {"public_api_key": key.key}
        else:
            return json_message("Unable to retrieve API Key"), 404