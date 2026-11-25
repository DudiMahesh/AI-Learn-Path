from flask_jwt_extended import create_access_token, decode_token, jwt_required, get_jwt_identity
from functools import wraps
from flask import jsonify
from models.user import User

def generate_access_token(user_id):
    return create_access_token(identity=str(user_id))

def get_current_user():
    user_id = get_jwt_identity()
    if user_id is not None:
        try:
            return User.query.get(int(user_id))
        except (ValueError, TypeError):
            return User.query.get(user_id)
    return None

def require_auth(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_current_user()
        if not current_user:
            return jsonify({"success": False, "message": "User not found"}), 401
        return fn(*args, **kwargs)
    return wrapper

def require_admin(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_current_user()
        if not current_user or current_user.role not in ('admin', 'super_admin'):
            return jsonify({"success": False, "message": "Admin privileges required"}), 403
        return fn(*args, **kwargs)
    return wrapper

def require_super_admin(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_current_user()
        if not current_user or current_user.role != 'super_admin':
            return jsonify({"success": False, "message": "Super Admin privileges required"}), 403
        return fn(*args, **kwargs)
    return wrapper
