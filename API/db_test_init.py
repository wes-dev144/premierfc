from database.tables.series import Series
from database.tables.users import User
from database.tables.club import Club
from database.tables.club_membership import ClubMember, ClubRoles
from database.tables.api_key import *
from database.tables.game import Game

from utils import *
from utils.utils import *
from app import init_app

import argparse
import inspect

class DBInit:
    def __init__(self):
        # Location, google_places_id
        self.locations = {"Manassas, VA": "ChIJi9Zl1IBbtokRUuf7tl6bUoM",
                            "Woodbridge, VA": "ChIJ-28cw5NVtokR4EZeo-gmIwc", 
                            "Fairfax, VA": "ChIJzZFLOZZOtokRQIZEhecmIwc", 
                            "Dulles, VA": "ChIJuc_EVAw2tokRvPJtxs0zbpI"}
        self.app = init_app(Flask(__name__))
        self.app.app_context().push()
    
    def create_users(self, number):
        print("Generating " + str(number) + " Random Users")
        for i in range(int(number)):
            index = str(i)
            dob = '-'.join([str(random.randrange(1, 13)), str(random.randrange(1, 29)), str(random.randrange(1980, 2006))])
            location = random.choice(list(self.locations.items()))
            user = User('new' + index, 'LastName' + index, 'email' + index + '@gmail.com', dob, location[0], location[1], random_id(28))
            db.session.add(user)
        db.session.commit()
    
    def create_clubs(self, number):
        print("Generating " + str(number) + " Random Clubs")
        for i in range(int(number)):
            index = str(i)
            user = User.query.filter(User.email == 'email' + index + '@gmail.com').first()
            if not user:
                user = User.query.filter(User.email == 'email0@gmail.com').first()
            owner_id = user.user_id
            location = random.choice(list(self.locations.items()))
            club = Club('Futbol-Club-' + index, location[0], location[1], owner_id)
            new_membership = ClubMember(user, club, ClubRoles.PRESIDENT)
            db.session.add(club)
            db.session.add(new_membership)
        db.session.commit()

    def generate_new_api_key(self, length):
        key = random_id(int(length))
        apikey = APIKey(key)
        db.session.add(apikey)
        db.session.commit()

    def init_club_members(self, num_of_users, num_of_clubs):
        clubs = Club.query.limit(num_of_clubs).all()
        users = User.query.all()
        for club in clubs:
            print("Adding " + str(num_of_users) + " Users to Club: " + club.name)
            for i in range(int(num_of_users)):
                retry = 0
                while retry < 10:
                    user = users[random.randrange(0, len(users))]
                    if ClubMember.query.filter(ClubMember._club_id == club.club_id, ClubMember._user_id == user.user_id).first():
                        retry += 1
                        continue
                    club_membership = ClubMember(user.user_id, club.club_id)
                    break
                db.session.add(club_membership)
        db.session.commit()

    def init_games(self, num_of_games, num_of_clubs):
        clubs = Club.query.limit(num_of_clubs).all()
        for club in clubs:
            print("Creating " + str(num_of_games) + " Games for Club: " + club.name)
            month = 4
            day = 2
            year = '2021'
            for i in range(int(num_of_games)):
                date = str(month) + '-' + str(day) + '-' + year
                series = Series(club.owner_id, club.club_id, date, date)
                game = Game(series.series_id, '5000 Stonecroft Blvd, Chantilly, VA 20151', 'ChIJlWOJHUVEtokRsbtZlSaNAhA', date, '19:00', '21:00')
                db.session.add(series)
                db.session.commit()
                db.session.add(game)
                db.session.commit()
                day += 1
            day += 3

    def init_test_database(self):
        self.create_users(120)
        self.create_clubs(5)
        self.init_club_members(50, 5)
        self.init_games(5,5)

if __name__ == '__main__':
    parser = argparse.ArgumentParser("This script is used to help generate test values in the database")
    parser.add_argument('-f', '--function', action='store', dest='func',
                        help='Function to run')
    parser.add_argument('-l', '--list', action='store_true', dest='list_func',
                        help='List all available functions to run')
    parser.add_argument('-a', '--args', nargs='+', dest='args',
                        help='Other arguments to pass in to function')
    args = parser.parse_args()

    methods = {}
    for func_name, func in inspect.getmembers(DBInit(), predicate=inspect.ismethod):
        if func_name == "__init__":
            continue
        methods[func_name] = func

    if args.list_func:
        for func_name, func in methods.items():
            val = inspect.getfullargspec(func)
            val.args.remove('self')
            print(func_name + "(" + ', '.join(val.args) + ")")
    else:
        try:
            if args.args:
                methods[args.func](*args.args)
            else:
                methods[args.func]()
        except KeyError as e:
            print("Method Unavailable: " + args.func)
            print("\nAvailable Methods:")
            for func_name, func in methods.items():
                print(func_name)
        sys.exit(1)

    