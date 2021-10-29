# Maestri
API:
pre-requisites:
    - python3 https://www.python.org/downloads/
    - pip
    - postgresql https://www.postgresql.org/download/

1. cd into API folder

2. Create or copy ./config/.env file ex.:
    SERVER=development
    PGSQLPASS=<postgresql database passwd>
    FLASK_APP=app.py

3. Create virtualenv (Requires install venv or virtualenv via pip) folder ./env:

4. Activate virtualenv:
    (Linux/Mac): source ./env/bin/activate
    (Windows): .\env\Scripts\activate

5. Check which python version you are using (Should be in ./env folder):
    (Linux/Mac): which python
    (Windows): where python

6. python3 -m pip install -r ../requirements.txt

7. Running app in API folder (Make sure virtualenv has been sourced):
    a. Using Python
        python app.py
    b. Using flask
        flask run

Client:
pre-requisites:
    - react-native https://reactnative.dev/docs/environment-setup (CLI Quickstart)
        - node
        - Java Jdk
        - Android Studio
    *** Follow the react-native docs instructions to install react-native and android studio properly before continuing

1. cd into Client Folder

2. First install npm packages by running:
    npm install

3. Create ./assests folder

4. Add necessary assets to assets folder then run:
    npx react-native link

5. Create copy or create ./client-config.js ex.:
    const Production = {
        GOOGLE_PLACES_API_KEY: "<API_KEY>",
        API_URL: "<URL>"
    }
    export default Production;

6. Create Android Phone on Android Studio AVD Manager

7. Running app:
    a. Without Script (Using two terminals) 
        npx react-native run-android (In terminal 1)
        npx react-native start (In terminal 2)
    b. With Script in base directory:
        ./start_app.sh
    
postgresql setup:
1. Install postgresql with script
    ./install-postgresql.sh

2. Create database user
    sudo -u postgres createuser apiadmin

3. Create databse
    sudo -u postgres createdb development
    sudo -u postgres createdb production

4. Set user password
    sudo -u postgres psql
    psql=# alter user <username> with encrypted password '<password>';

5. Grant privileges to database
    psql=# grant <privileges> privileges on database <dbname> to <username> ;

6. Run/Setup pgAdmin4 (Optional, but highly recommended)
    a. Click "Add New Server"
    b. Follow setup steps and create server on localhost.