from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import ConfigType, config
from flask_cors import CORS
from .main import main as main_blueprint

db: SQLAlchemy = SQLAlchemy()


def create_app(config_name: ConfigType) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)
    CORS(app)

    app.register_blueprint(main_blueprint)

    return app
