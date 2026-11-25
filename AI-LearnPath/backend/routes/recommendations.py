from flask import Blueprint
from utils.auth import require_auth
from utils.response import success_response

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommendations', methods=['GET'])
@require_auth
def get_recommendations():
    return success_response([])

@recommendations_bp.route('/ai-recommendations', methods=['GET'])
@require_auth
def get_ai_recommendations():
    return success_response([])
