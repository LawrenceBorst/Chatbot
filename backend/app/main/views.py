from flask import request, jsonify
from . import main
from flask_login import login_required, current_user
from ..models import Conversation


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

    return jsonify("Hello World")


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
