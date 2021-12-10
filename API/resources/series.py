from database.tables.series import Series
from database.tables.game import Game
from database.tables.club import Club
from database.tables.signup import Signup
from . import *

class SeriesGamesList(Resource):
    def get_city_state(self, address):
        split_addr = address.split(' ')
        if split_addr[-1].isnumeric():
            return split_addr[-3].strip() + " " + split_addr[-2].strip()
        else:
            return split_addr[-2].strip() + " " + split_addr[-1].strip()

    def get(self, series_id):
        query = db.session.query(Series, Game._game_id, Game._date, Game._start_time, 
                                    Game._end_time, Game.match_type, Game.max_size,
                                    Game.address, Game.signup_day, Game._signup_time
                                ).join(Game, Game._series_id == Series._series_id).filter(Series._series_id == series_id).all()
        json_return = {"games": []}
        for result in query:
            info = {
                "id": result[1],
                "date": result[2].strftime('%m/%d/%Y'),
                "start_time": result[3].strftime('%H:%M'),
                "end_time": result[4].strftime('%H:%M'),
                "match_type": result[5],
                "max_size": result[6],
                "address": result[7],
                "city_state": self.get_city_state(result[7]),
                "signup_day": result[8],
                "signup_time": result[9].strftime('%H:%M')
            }
            
            signed_up_users = Signup.query.filter(Signup._game_id == info["id"]).all()
            info["signup_count"] = len(signed_up_users)

            json_return["games"].append(info)

        return json_return

class SignupList(Resource):
    @validate_json('user_id')
    def post(self, game_id):
        data = request.get_json()
        if Signup.query.filter(Signup._user_id == data['user_id']).filter(Signup._game_id == game_id).first():
            return json_message("User Already Has Arealdy Registered for the Game!"), 403
        
        game_roster = Signup.query.all()
        current_size = len(game_roster)

        try:
            signup = Signup(data['user_id'], game_id, current_size + 1)
        except ValueError as e:
            return json_message("Invalid Data format", e), 400

        db.session.add(signup)
        db.session.commit()        
        return json_message("User Successfully Joined Club!")