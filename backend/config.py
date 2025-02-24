import os
from enum import StrEnum
from typing import Dict

_basedir = os.path.abspath(os.path.dirname(__file__))


class ConfigType(StrEnum):
    DEVELOPMENT = "development"
    TESTING = "testing"
    PRODUCTION = "production"
    DEFAULT = "default"


class Config:
    SECRET_KEY: str = os.environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    SESSION_COOKIE_SAMESITE: str = "None"
    SESSION_COOKIE_SECURE: bool = True
    MAIL_SERVER: str = "smtp.googlemail.com"
    MAIL_PORT: int = 587
    MAIL_USE_TLS: bool = True
    MAIL_USERNAME: str = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD: str = os.environ.get("MAIL_PASSWORD")
    MAIL_SUBJECT_PREFIX: str = '[Lawrence Borst Chatbot]'
    MAIL_SENDER: str = 'Lawrence Borst Chatbot <lawrenceborstchatbot@gmail.com>'

    @staticmethod
    def init_app(app) -> None:
        pass


class DevelopmentConfig(Config):
    DEBUG: bool = True
    SQLALCHEMY_DATABASE_URI: str = os.environ.get(
        "DEV_DATABASE_URL"
    ) or "sqlite:///" + os.path.join(_basedir, "data-dev.sqlite")


class TestingConfig(Config):
    TESTING: bool = True
    SQLALCHEMY_DATABASE_URI: str = os.environ.get("TEST_DATABASE_URL") or "sqlite://"


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI: str = os.environ.get(
        "DATABASE_URL"
    ) or "sqlite:///" + os.path.join(_basedir, "data.sqlite")


config: Dict[ConfigType, Config] = {
    ConfigType.DEVELOPMENT: DevelopmentConfig,
    ConfigType.PRODUCTION: ProductionConfig,
    ConfigType.TESTING: TestingConfig,
    ConfigType.DEFAULT: DevelopmentConfig,
}
