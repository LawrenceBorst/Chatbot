from flask import request, jsonify
from . import main
from flask_login import login_required, current_user
from ..models import Conversation, Message
from .random_responses import random_responses
import random
from .. import db, limiter
from datetime import datetime


@limiter.limit("10 per minute")
@main.route("/conversations", methods=["GET"])
@login_required
def conversations():
    """
    This endpoint fetches a list of conversations for a given user
    """
    conversations = Conversation.query.filter_by(owner=current_user.id).all()

    return [
        {
            "name": conversation.name,
            "id": conversation.id,
            "timestamp": conversation.timestamp.isoformat(),
        }
        for conversation in conversations
    ]

@limiter.limit("10 per minute")
@main.route("/conversations", methods=["POST"])
@login_required
def conversations_post():
    """
    This endpoint creates/starts a new conversation for a given user
    """
    name: str = request.args.get("name")

    if not name:
        return 400

    conversation: Conversation = Conversation(
        owner=current_user.id, name=name, timestamp=_get_current_time()
    )
    db.session.add(conversation)

    db.session.commit()

    return jsonify({"id": conversation.id})


@limiter.limit("10 per minute")
@main.route("/conversations/<int:id>", methods=["GET"])
@login_required
def conversation(id: int):
    """
    This endpoint fetches a conversation for a given user
    """
    if not _is_resource_owner(id):
        return 403

    messages = Message.query.filter_by(conversation=id)

    return [
        {
            "id": message.id,
            "is_user": message.is_user,
            "message": message.message,
            "timestamp": message.timestamp.isoformat(),
        }
        for message in messages
    ]


@limiter.limit("10 per minute")
@main.route("/conversations/<int:id>", methods=["POST"])
@login_required
def conversation_post(id: int):
    """
    This endpoint posts a message to a conversation
    """
    if not _is_resource_owner(id):
        return 403

    message: str = request.args.get("message")

    if not message:
        return 400

    user_message: Message = Message(
        conversation=id, is_user=True, message=message, timestamp=_get_current_time()
    )
    db.session.add(user_message)

    response: str = random_responses[random.randint(0, len(random_responses) - 1)]

    bot_message: Message = Message(
        conversation=id, is_user=False, message=response, timestamp=_get_current_time()
    )
    db.session.add(bot_message)

    db.session.commit()

    return jsonify(response)


def _get_current_time() -> datetime:
    return datetime.today()


def _is_resource_owner(convo_id: int) -> bool:
    owner_id: str = Conversation.query.filter_by(id=convo_id).first().owner

    return owner_id == current_user.id
