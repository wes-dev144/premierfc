from database.tables.series import Series
from database.tables.club import Club
from database.tables.users import User
from database.tables.club_membership import ClubMember
from . import *

class ClubsList(Resource):
    def get(self):
        query = db.session.query(Club, Club._club_id, Club.name, Club.location, User.first_name, User.last_name
                                    ).join(User, User._user_id == Club.owner_id).all()
        json_return = {"clubs": []}
        for result in query:
            club_id = result[1]
            club_name = result[2]
            location = result[3]
            president = result[4] + " " + result[5]
            info = {
                "id": club_id,
                "name": club_name,
                "location": location,
                "president": president,
                "series_ids": []
            }
            game_series = Series.query.filter(Club._club_id == club_id).first()
            members = ClubMember.query.filter(ClubMember._club_id == club_id).all()
            info["series_ids"].append(game_series.series_id)
            info["member_count"] = len(members)
            json_return["clubs"].append(info)
        return json_return

class ClubMembership(Resource):
    @validate_json('user_id')
    def post(self, club_id):
        data = request.get_json()
        if ClubMember.query.filter(ClubMember._user_id == data['user_id']).filter(ClubMember._club_id == club_id).first():
            return json_message("User Already Has Already Joined The Club"), 403

        try:
            membership = ClubMember(data['user_id'], club_id)
        except ValueError as e:
            return json_message("Invalid Data format", e), 400

        db.session.add(membership)
        db.session.commit()        
        return json_message("User Successfully Joined Club!")
