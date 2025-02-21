from flask import jsonify, request
from . import auth
from flask_login import login_user
from ..models import User


@auth.route("/login", methods=["GET", "POST"])
def login():
    password: str = request.args.get("password")
    username: str = request.args.get("username")

    if not username or not password:
        return 400

    user: User = User.query.filter_by(name=username).first()

    if user is None or not user.verify_password(password):
        return 400

    login_user(user)

    return jsonify({"id": user.id, "name": user.name}), 200
