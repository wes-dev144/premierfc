from . import *

class GameInfo(Resource):
    def get(self, game_id):
        game = Game.query.filter(Game._game_id == game_id).first()
        if game:
            schema = GameSchema()
            return schema.dump(game)
        else:
            return json_message("Game Not Found"), 404

    def get(self, game_date, game_time, _series_id):
        game = Game.query.filter(Game.game_date == game_date, Game.game_time == game_time, Game._series_id == _series_id).first()
        if game:
            schema = GameSchema()
            return schema.dump(game)
        else:
            return json_message("Game Not Found"), 404

    @validate_json('_series_id', '_address', 'game_date', 'game_time', 'match_status', 'postalcode')
    def post(self):
        data = request.get_json()
        if Game.query.filter(Game.game_date == data['game_date'], Game.game_time == data['game_time'], Game._series_id == data['_series_id']).first():
            return json_message("game already created at this time and date"), 403
            
        try:
            game = Game(data['_series_id'], data['_address'], data['game_date'], 
                        data['game_time'], data['match_status'], data['postalcode'])
        except ValueError as e:
            return json_message("Invalid Data format", e), 400
        except MissingCityStateID as e:
            return json_message("Invalid City or State"), 400

        db.session.add(game)
        db.session.commit()        
        return json_message("Added: " + game.__repr__())

    #TODO
    def patch(self, game_id):
        data = request.get_json()
        if not data:
            return json_message("JSON data required"), 400
        game = Game.query.filter(Game._game_id == game_id).first()
        metadata = db.Model.metadata.tables['games'].columns
        if game:
            for attribute, value in data.items():
                if hasattr(game, attribute):
                    try:
                        setattr(game, attribute, value)
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
            return json_message("Updated Game")
        else:
            return json_message("Game Not Found"), 404

class GamesList(Resource):
    def get(self):
        data = request.get_json()
        query_limit = 50
        offset = 0
        if data:
            if 'query_limit' in data:
                query_limit = data['query_limit']

            if 'offset' in data:
                offset = data['offset']
        games = Game.query.limit(query_limit).offset(offset).all()
        if games:
            schema = GameSchema(many=True)
            return schema.dump(games)
        else:
            return json_message("No Games Found"), 404
    def post(self):  
        return json_message("please specify game and information"), 404
    def delete(self):  
        return json_message("please provide valid game to delete"), 404