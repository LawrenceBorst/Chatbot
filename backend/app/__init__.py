from flask import Flask
from itsdangerous import URLSafeTimedSerializer
from config import ConfigType, config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail
from flask_login import LoginManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


db: SQLAlchemy = SQLAlchemy()
login_manager: LoginManager = LoginManager()
login_manager.login_view = "auth.login"
mail: Mail = Mail()
serializer: URLSafeTimedSerializer
limiter: Limiter


def create_app(config_name: ConfigType) -> Flask:
    global serializer
    global limiter

    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)
    login_manager.init_app(app)
    CORS(app, supports_credentials=True)
    mail.init_app(app=app)
    serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
    limiter = Limiter(app=app, key_func=get_remote_address)

    from .main import main as main_blueprint
    from .auth import auth as auth_blueprint

    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint, url_prefix="/auth")

    return app
