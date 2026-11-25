from flask import Blueprint
from utils.auth import require_admin
from utils.response import success_response

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/stats', methods=['GET'])
@require_admin
def stats():
    return success_response({"users": 0, "courses": 0})

# Simple mocks for CRUD
@admin_bp.route('/<resource>', methods=['GET'])
@require_admin
def list_resource(resource):
    return success_response([])
    
@admin_bp.route('/<resource>', methods=['POST'])
@require_admin
def create_resource(resource):
    return success_response({"id": 1})

@admin_bp.route('/<resource>/<id>', methods=['PUT', 'DELETE'])
@require_admin
def update_delete_resource(resource, id):
    return success_response(message="Success")
