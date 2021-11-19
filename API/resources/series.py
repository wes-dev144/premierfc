from database.tables.series import Series
from database.tables.game import Game
from database.tables.club import Club
from database.tables.signup import Signup

from . import *

class SeriesGamesList(Resource):
    def get(self, series_id):
        query = db.session.query(Series, Game._game_id, Game._date, Game._start_time, 
                                    Game._end_time, Game.match_type, Game.max_size,
                                    Game.address, Game.signup_day, Game._signup_time
                                ).join(Game, Game._series_id == Series._series_id).filter(Series._series_id == series_id).all()
        json_return = {"games": []}
        print(query)
        for result in query:
            info = {
                "id": result[1],
                "date": result[2].strftime('%m/%d/%Y'),
                "start_time": result[3].strftime('%H:%M'),
                "end_time": result[4].strftime('%H:%M'),
                "match_type": result[5],
                "max_size": result[6],
                "address": result[7],
                "signup_day": result[8],
                "signup_time": result[9].strftime('%H:%M')
            }
            print(info)
            signed_up_users = Signup.query.filter(Signup._game_id == info["id"]).all()
            info["signup_count"] = len(signed_up_users)
            print(signed_up_users)
            # info["series_ids"].append(game_series.series_id)
            json_return["games"].append(info)
        return json_return
