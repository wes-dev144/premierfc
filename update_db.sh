#!/bin/bash
if [[ -d migrations ]]; then
    rm -rf migrations
fi
export FLASK_APP=API/app
python API/drop_tables.py -t alembic_version
flask db init
flask db migrate
flask db upgrade
