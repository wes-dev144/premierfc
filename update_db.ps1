if (Test-Path migrations){
    echo "Removing Migrations Folder"
    rm -Recurse -Confirm:$false -Force migrations
}

python API/drop_tables.py -t alembic_version

echo "Initializing Migrations"
python API/migrate.py db init

echo "Migrating Tables"
python API/migrate.py db migrate

echo "Upgrading DB"
python API/migrate.py db upgrade