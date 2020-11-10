import os
from dotenv import load_dotenv
import yaml
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    load_dotenv(os.path.join(basedir, '.env'))
    with open(os.path.join(basedir, 'config.yaml'), 'r') as f:
        _yaml_config = f.read()
    _config =  yaml.load(_yaml_config, Loader=yaml.Loader)
    _user = _config[os.environ.get("SERVER")]["user"]
    _passwd = os.environ.get("PFCPWD")
    _database = _config[os.environ.get("SERVER")]['database']
    SQLALCHEMY_DATABASE_URI = 'postgresql://' + _user + ':' + _passwd + '@localhost/' + _database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False