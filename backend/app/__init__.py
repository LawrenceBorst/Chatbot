from flask import Flask
from config import ConfigType, config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager

db: SQLAlchemy = SQLAlchemy()
login_manager: LoginManager = LoginManager()
login_manager.login_view = "auth.login"


def create_app(config_name: ConfigType) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)
    login_manager.init_app(app)
    CORS(app, supports_credentials=True)

    from .main import main as main_blueprint
    from .auth import auth as auth_blueprint

    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint, url_prefix="/auth")

    return app
