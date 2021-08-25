from sqlalchemy.orm import relationship
from . import *

class UserInfo(Resource):
    def get(self, user_id):
        user = User.query.filter(User._user_id == user_id).first()
        if user:
            schema = UserSchema()
            return schema.dump(user)
        else:
            return json_message("User Not Found"), 404

    @validate_json('first_name', 'last_name', 'email', 'date_of_birth', 'city', 'state')
    def post(self):
        data = request.get_json()
        if User.query.filter(User.email == data['email']).first():
            return json_message("Email Has Been Registered"), 403
            
        try:
            user = User(data['first_name'], data['last_name'], data['email'], 
                        data['date_of_birth'], data['city'], data['state'])
        except ValueError as e:
            return json_message("Invalid Data format", e), 400
        except MissingCityStateID as e:
            return json_message("Invalid City or State"), 400

        db.session.add(user)
        db.session.commit()        
        return json_message("Added: " + user.__repr__())

    def patch(self, user_id):
        data = request.get_json()
        if not data:
            return json_message("JSON data required"), 400
        user = User.query.filter(User._user_id == user_id).first()
        metadata = db.Model.metadata.tables['users'].columns
        if user:
            for attribute, value in data.items():
                if hasattr(user, attribute):
                    try:
                        setattr(user, attribute, value)
                    except ValueError as e:
                        attr_meta_data = getattr(metadata, attribute)
                        return json_message("Invalid Attribute Format", "(", attr_meta_data.type,")", e), 400
                    except AttributeError as e:
                        return json_message("Invalid Attribute:", str(e), attribute), 400
                    except MissingCityStateID as e:
                        return json_message("Invalid City or State"), 400
                else:
                    return json_message("Cannot Change Value: " + attribute), 400
            db.session.commit()
            return json_message("Updated User")
        else:
            return json_message("User Not Found"), 404

class UserRelationship(Resource):
    def get(self, primary_user, secondary_user):
        relationship = UserRelationship.query.filter(UserRelationship.primary_user == primary_user, UserRelationship.secondary_user == secondary_user).first()
        if relationship:
            schema = UserSchema()
            return schema.dump(relationship)
        else:
            return json_message("Relationship Not Found"), 404

    @validate_json('primary_user', 'secondary_user', 'relationship')
    def post(self):
        data = request.get_json()
        try:
            relationship = UserRelationship(data['primary_user'], data['secondary_user'], data['relationship'])
            #inverse_relationship = UserRelationship(data['secondary_user'], data['primary_user'], data['relationship'])
        except ValueError as e:
            return json_message("Invalid Data format", e), 400
        except:
            return json_message("Invalid Data format"), 400

        db.session.add(relationship)
        #db.session.add(inverse_relationship)
        db.session.commit()        
        return json_message("Added: " + relationship.__repr__())

#TODO: dump all relationships for one user

class UsersList(Resource):
    def get(self):
        data = request.get_json()
        query_limit = 50
        offset = 0
        if data:
            if 'query_limit' in data:
                query_limit = data['query_limit']

            if 'offset' in data:
                offset = data['offset']
        users = User.query.limit(query_limit).offset(offset).all()
        if users:
            schema = UserSchema(many=True)
            return schema.dump(users)
        else:
            return json_message("No Users Found"), 404
    def post(self):  
        return json_message("please specify user and information"), 404
    def delete(self):  
        return json_message("please provide valid user to delete"), 404