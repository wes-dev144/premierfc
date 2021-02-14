if (Test-Path migrations){
    echo "removing"
    rm -Recurse -Confirm:$false -Force migrations
}

python API/migrate.py db init
python API/migrate.py db migrate
python API/migrate.py db upgrade