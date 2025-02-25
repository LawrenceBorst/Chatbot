from flask import Response, jsonify, make_response, request
from itsdangerous import BadSignature, SignatureExpired
from app.email import send_email
from sqlalchemy import or_
from . import auth
from flask_login import login_required, login_user, current_user, logout_user
from ..models import Conversation, User, Message
from .. import serializer, db


@auth.route("/register", methods=["GET", "POST"])
def register():
    password: str = request.args.get("password")
    username: str = request.args.get("username")
    email: str = request.args.get("email")

    if None in [password, username, email]:
        return 400

    user_exists: bool = (
        User.query.filter(or_(User.name == username, User.email == email)).first()
        is not None
    )

    if user_exists:
        return 400

    user: User = User(
        name=username,
        email=email,
        password=password,
        confirmed=False,
    )

    db.session.add(user)
    db.session.commit()

    token = serializer.dumps(user.email, salt="email-confirm")

    send_email(
        user.email,
        "Confirm Your Account",
        "email/confirm",
        user=user,
        token=token,
    )

    return jsonify("Email sent"), 200


@auth.route(
    "/email/confirm/<token>",
)
def confirm_email(token: str):
    email: str

    try:
        email = serializer.loads(token, salt="email-confirm", max_age=3600)
    except (SignatureExpired, BadSignature):
        return "Invalid or expired token", 400

    user: User = User.query.filter_by(email=email).first()

    if user is None:
        return "User not found", 401

    user.confirmed = True

    db.session.commit()

    return "Email confirmed", 200


@auth.route("/delete", methods=["GET", "POST"])
@login_required
def delete() -> Response:
    """
    This endpoint deletes an account and all associated data
    """
    Message.query.filter(
        Message.conversation.in_(
            db.session.query(Conversation.id).filter_by(owner=current_user.id)
        )
    ).delete(synchronize_session=False)

    Conversation.query.filter_by(owner=current_user.id).delete(
        synchronize_session=False
    )

    User.query.filter_by(name=current_user.name).delete(synchronize_session=False)

    db.session.commit()

    return make_response(
        jsonify(
            {
                "message": "All accounts and associated data with the current user's name have been deleted"
            }
        ),
        200,
    )


@auth.route("/login", methods=["GET", "POST"])
def login() -> Response:
    password: str = request.args.get("password")
    username: str = request.args.get("username")

    if not username or not password:
        return 400

    user: User = User.query.filter_by(name=username).first()

    if user is None or not user.verify_password(password) or not user.confirmed:
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
def auth_status():
    if not current_user.is_authenticated:
        return jsonify({"id": None, "name": None}), 200

    return jsonify({"id": current_user.id, "name": current_user.name}), 200
