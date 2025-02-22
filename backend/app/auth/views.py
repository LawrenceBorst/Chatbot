from flask import Response, jsonify, make_response, request
from . import auth
from flask_login import login_required, login_user, current_user, logout_user
from ..models import User


@auth.route("/login", methods=["GET", "POST"])
def login() -> Response:
    password: str = request.args.get("password")
    username: str = request.args.get("username")

    if not username or not password:
        return 400

    user: User = User.query.filter_by(name=username).first()

    if user is None or not user.verify_password(password):
        return 400

    login_user(user, remember=True)

    response: Response = make_response(jsonify({"id": user.id, "name": user.name}), 200)

    return response


@auth.route("/logout", methods=["GET"])
@login_required
def logout() -> Response:
    logout_user()

    return make_response(jsonify({"message": "Logged out"}), 200)


@auth.route("/status", methods=["GET"])
@login_required
def auth_status():
    return jsonify({"id": current_user.id, "name": current_user.name}), 200
