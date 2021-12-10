if (Test-Path migrations){
    echo "Removing Migrations Folder"
    rm -Recurse -Confirm:$false -Force migrations
}
$env:FLASK_APP = "API/app.py"
python API/drop_tables.py -t alembic_version

echo "Initializing Migrations"
flask db init

echo "Migrating Tables"
flask db migrate

echo "Upgrading DB"
flask db upgrade