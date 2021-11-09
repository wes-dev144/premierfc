from database.tables.users import User
from database.tables.club import Club
from database.tables.club_membership import ClubMember, ClubRoles
from database.tables.locations import *
from database.tables.api_key import *

from utils import *
from utils.utils import *
from app import init_app

import argparse
import inspect

class DBInit:
    def __init__(self):
        self.cities = ["Manassas", "Woodbridge", "Fairfax", "Herndon"]
        self.app = init_app(Flask(__name__))
        self.app.app_context().push()
    
    def create_users(self, number):
        print("Generating " + str(number) + " Random Users")
        for i in range(int(number)):
            index = str(i)
            dob = '-'.join([str(random.randrange(1980, 2006)), str(random.randrange(1, 13)), str(random.randrange(1, 29))])
            user = User('new' + index, 'LastName' + index, 'email' + index + '@gmail.com', dob, self.cities[random.randrange(0, 4)], "Virginia", random_id(28))
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
            club = Club('Futbol-Club-' + index, self.cities[random.randrange(0, 4)], "Virginia", owner_id)
            new_membership = ClubMember(user, club, ClubRoles.PRESIDENT)
            db.session.add(club)
            db.session.add(new_membership)
        db.session.commit()

    def generate_new_api_key(self, length):
        key = random_id(int(length))
        apikey = APIKey(key)
        db.session.add(apikey)
        db.session.commit()

    def load_location_data(self):
        # Database data from: https://simplemaps.com/data/us-zips.
        file="database/us_zips_data/uszips.csv"
        states = {}
        cities = set([])
        postal_codes = set([])
        city_state_id = 0
        with open(file, 'r') as f:
            for line in f.readlines()[1:]:
                city_state_id += 1
                data = line.split(',')
                zip = int(data[0].strip('"'))
                lat = float(data[1].strip('"'))
                long = float(data[2].strip('"'))
                city_name = data[3].strip('"')
                state_code = data[4].strip('"')
                state_name = data[5].strip('"')
                timezone = data[-1].strip('\n').strip('"')

                if state_name not in states:
                    state_id = len(states) + 1
                    state = State(state_id, state_name, state_code)
                    states[state_name] = (state, state_id)
                    db.session.add(state)

                cities.add(City(city_state_id, states[state_name][1], city_name))
                postal_codes.add(PostalCode(zip, lat, long, timezone, city_state_id, states[state_name][1]))
        
        print("Added Database entries from: https://simplemaps.com/data/us-zips")
        print("Commiting state Data")
        db.session.commit()

        print("Commiting city_state Data")
        for city in cities:
            db.session.add(city)
        db.session.commit()

        print("Commiting postal_code Data")
        for postal_code in postal_codes:
            db.session.add(postal_code)
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
                    club_membership = ClubMember(user, club)
                    break
                db.session.add(club_membership)
        db.session.commit()

    def init_test_database(self):
        self.load_location_data()
        self.create_users(120)
        self.create_clubs(5)
        self.init_club_members(50, 5)

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

    