from flask import Blueprint, request, jsonify
from app.utils.sendgrid_client import send_email

notifications_bp = Blueprint('notifications', __name__)

@notifications_bp.route('/email', methods=['POST'])
def notify_email():
    data = request.get_json()
    to_email = data.get('to_email')
    subject = data.get('subject')
    content = data.get('content')
    if send_email(to_email, subject, content):
        return jsonify({'status': 'Email sent'}), 200
    else:
        return jsonify({'status': 'Failed to send email'}), 500
