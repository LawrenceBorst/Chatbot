from . import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))

    def __repr__(self):
        return "<User %r>" % self.name


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey("users.id"))
    conversation = db.Column(db.Integer, db.ForeignKey("conversations.id"))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True)

    def __repr__(self):
        return "<Message %r>" % self.message


class Conversation(db.Model):
    __tablename__ = "conversations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, index=True)
    timestamp = db.Column(db.DateTime, index=True)

    def __repr__(self):
        return "<Conversation %r>" % self.name


db.Index("ix_messages_time", Message.conversation, Message.timestamp)
