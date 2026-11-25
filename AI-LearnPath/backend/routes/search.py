from flask import Blueprint, request
from utils.auth import require_auth
from utils.response import success_response

search_bp = Blueprint('search', __name__)

@search_bp.route('', methods=['GET'])
@require_auth
def search():
    query = request.args.get('q', '')
    return success_response({"results": []})
