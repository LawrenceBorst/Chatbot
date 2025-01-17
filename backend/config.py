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
