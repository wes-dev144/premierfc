#!/bin/bash
if [[ -d migrations ]]; then
    rm -rf migrations
fi
python API/drop_tables.py -t alembic_version
python API/migrate.py db init
python API/migrate.py db migrate
python API/migrate.py db upgrade
