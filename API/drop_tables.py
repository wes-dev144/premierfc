from utils import *
from config.config import Config
from sqlalchemy import MetaData
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser("Drop tables")
    parser.add_argument('-a', '--all', action='store_true', dest='drop_all',
                        help='Drop All Tables')
    parser.add_argument('-t', '--tables', nargs='+', dest='tables',
                        help='List of tables to drop')
    args = parser.parse_args()

    pgsql_engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    metadata = MetaData(pgsql_engine)
    metadata.reflect()

    print("Database: " + pgsql_engine.url.database)
    if args.drop_all:
        print("Dropping all tables from")
        metadata.drop_all()
    else:
        for table_name in args.tables:
            print("Attempting to drop: " + table_name)
            table = metadata.tables.get(table_name)
            if table != None:
                print("Dropping: " + table_name)
                table.drop()
            else:
                print("Table Does Not Exist...")