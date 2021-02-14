#!/bin/env
from utils import *
import jwt
from functools import wraps

def verify_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            auth_token = request.headers.get('Authorization').split()[1]
        except:
            return json_message("Token Required"), 403

        try:
            jwt.decode(auth_token, os.environ.get("API_KEY"), algorithms=["HS256"])
        except:
            return json_message("Invalid Token"), 403

        return func(*args, **kwargs)
    return wrapper

def validate_json(*params):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):     
            data = request.get_json()
            for param in params:
                if param not in data:
                    return json_message("Malformed JSON Data Recieved"), 400
            return func(*args, **kwargs)
        return wrapper
    return decorator

def json_message(msg):
    return {"message": msg}

def random_id(length):
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(length))