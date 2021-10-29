from database.tables.users import User
from database.tables.locations import *
from database.tables.api_key import *

from utils import *
from utils.utils import *
from app import init_app

import argparse
import inspect

class DBInit:
    def __init__(self):
        self.app = init_app(Flask(__name__))
        self.app.app_context().push()
    
    def create_users(self, number, *args):
        for i in range(int(number)):
            index = str(i)
            user = User('new' + index, 'LastName' + index, 'email' + index + '@gmail.com', '1994-12-22', "Flushing", "New York", random_id(28))
            db.session.add(user)
        db.session.commit()

    def generate_new_api_key(self, length, *args):
        key = random_id(int(length))
        apikey = APIKey(key)
        db.session.add(apikey)
        db.session.commit()

    def load_location_data(self, *args, file="database/us_zips_data/uszips.csv"):
        # Database data from: https://simplemaps.com/data/us-zips.
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
    
    def test(self, user_id, *args):
        user = User.query.filter(User.user_id == user_id).first()
        print(user.date_of_birth, type(user.date_of_birth))
        user.last_logged_in = '12341'

        # print(user.date_of_birth.strftime('%Y-%m-%d'))
        # user.email = 'new44@gmail.com'
        db.session.commit()
        

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
            print(func_name)
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

    