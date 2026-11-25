from flask import Blueprint, request
from models import db, User, UserSettings
from utils.auth import require_auth, get_current_user
from utils.response import success_response, error_response

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('', methods=['GET'])
@require_auth
def get_profile():
    user = get_current_user()
    settings = UserSettings.query.filter_by(user_id=user.id).first()
    data = user.to_dict()
    data['settings'] = settings.settings if settings else {}
    return success_response(data)

@profile_bp.route('', methods=['PUT'])
@require_auth
def update_profile():
    from models.career import Career
    user = get_current_user()
    data = request.json
    if 'name' in data: user.name = data['name']
    if 'career_id' in data: user.career_id = data['career_id']
    # Accept career by name (from onboarding)
    if 'career' in data and data['career']:
        career = Career.query.filter_by(name=data['career']).first()
        if career:
            user.career_id = career.id
    db.session.commit()
    return success_response(user.to_dict())

@profile_bp.route('/settings', methods=['PUT'])
@require_auth
def update_settings():
    user = get_current_user()
    data = request.json
    settings = UserSettings.query.filter_by(user_id=user.id).first()
    if not settings:
        settings = UserSettings(user_id=user.id, settings=data)
        db.session.add(settings)
    else:
        settings.settings = data
    db.session.commit()
    return success_response(settings.to_dict())
