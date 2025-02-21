from flask import request, jsonify
from . import main
from flask_login import login_required


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
