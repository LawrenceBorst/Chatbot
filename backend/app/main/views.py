from flask import request, jsonify
from . import main
from flask_login import login_required, current_user
from ..models import Conversation, Message
from .random_responses import random_responses
import random


@main.route("/process-input", methods=["GET"])
@login_required
def process_input():
    """
    This endpoint processes input from the user to the chatbot
    and returns a response.
    """
    text: str = request.args.get("text")
    if not text:
        return 400

    response: str = random_responses[random.randint(0, len(random_responses) - 1)]

    return jsonify(response)


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


def _is_resource_owner(convo_id: int) -> bool:
    owner_id: str = Conversation.query.filter_by(id=convo_id).first().owner

    return owner_id == current_user.id
