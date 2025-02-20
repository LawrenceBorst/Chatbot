import os
import click
from app import create_app, db
from flask_migrate import Migrate
from flask import Flask
from app.models import User, Message, Conversation
from dotenv import load_dotenv
import unittest

load_dotenv()

app: Flask = create_app(os.getenv("FLASK_CONFIG") or "default")
migrate: Migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context() -> dict:
    """
    This function is used to add additional context to the Flask shell.
    """
    return dict(
        app=app,
        db=db,
        User=User,
        Message=Message,
        Conversation=Conversation,
    )


@app.cli.command()
@click.argument("test_names", nargs=-1)
def test(test_names: tuple[str]) -> None:
    """Run the unit tests."""
    if test_names:
        tests = unittest.TestLoader().loadTestsFromNames(test_names)
    else:
        tests = unittest.TestLoader().discover("tests")

    unittest.TextTestRunner(verbosity=2).run(tests)
