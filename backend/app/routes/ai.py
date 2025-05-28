from flask import Blueprint, request, jsonify

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/suggest-priority', methods=['POST'])
def suggest_priority():
    # Dummy logic for now
    data = request.get_json()
    title = data.get("title", "")
    if "urgent" in title.lower():
        priority = "High"
    else:
        priority = "Medium"
    return jsonify({"suggested_priority": priority})
