from flask import Blueprint, request, jsonify, url_for, render_template
from app import db
from app.auth.models import User
from app.auth.utils import generate_reset_token, verify_reset_token
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.utils.sendgrid_client import send_email

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if User.query.filter_by(email=email).first():
        return jsonify({'msg': 'Email already registered'}), 400
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User created'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = create_access_token(identity=user.email)
        return jsonify({'access_token': token}), 200
    return jsonify({'msg': 'Invalid credentials'}), 401

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg': 'If this email is registered, a reset link will be sent.'}), 200
    token = generate_reset_token(email)
    reset_url = url_for('auth.reset_password', token=token, _external=True)
    html = render_template('reset_password.html', reset_url=reset_url)
    send_email(email, "Password Reset", html)
    return jsonify({'msg': 'If this email is registered, a reset link will be sent.'}), 200

@auth_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    data = request.get_json()
    password = data.get('password')
    email = verify_reset_token(token)
    if not email:
        return jsonify({'msg': 'Invalid or expired token'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    user.set_password(password)
    db.session.commit()
    return jsonify({'msg': 'Password updated'}), 200
