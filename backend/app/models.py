import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import db, login_manager


class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(128))
    confirmed = db.Column(db.Boolean, default=False)

    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "<User %r>" % self.name


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation = db.Column(db.String(36), db.ForeignKey("conversations.id"))
    is_user = db.Column(db.Boolean)
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True)

    def __repr__(self):
        return "<Message %r>" % self.message


class Conversation(db.Model):
    __tablename__ = "conversations"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(64), index=True)
    owner = db.Column(db.String(36), db.ForeignKey("users.id"))
    timestamp = db.Column(db.DateTime, index=True)

    def __repr__(self):
        return "<Conversation %r>" % self.name


db.Index("ix_messages_time", Message.conversation, Message.timestamp)
