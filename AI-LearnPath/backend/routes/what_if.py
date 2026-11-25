from flask import Blueprint, request
from utils.auth import require_auth
from utils.response import success_response

what_if_bp = Blueprint('what_if', __name__)

@what_if_bp.route('', methods=['POST'])
@require_auth
def what_if():
    data = request.json
    return success_response({
        "estimated_completion_time_weeks": 4,
        "estimated_skill_development": {"Python": "+10%"},
        "is_estimate": True
    })
