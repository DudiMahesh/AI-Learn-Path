from flask import Blueprint
from utils.auth import require_auth, get_current_user
from utils.response import success_response
from models import db, LearningPath, LearningPathItem, Topic, LearningPathChangelog
from services.learning_path_service import generate_learning_path

learning_path_bp = Blueprint('learning_path', __name__)

@learning_path_bp.route('', methods=['GET'])
@require_auth
def get_path():
    user = get_current_user()
    path = LearningPath.query.filter_by(user_id=user.id, is_active=True).first()
    if not path:
        return success_response(None)
        
    items = LearningPathItem.query.filter_by(path_id=path.id).order_by(LearningPathItem.order_index).all()
    res_items = []
    for item in items:
        topic = Topic.query.get(item.topic_id)
        d = item.to_dict()
        if topic: d['topic'] = topic.to_dict()
        res_items.append(d)
        
    res = path.to_dict()
    res['items'] = res_items
    return success_response(res)

@learning_path_bp.route('/generate', methods=['POST'])
@require_auth
def generate():
    user = get_current_user()
    path_data = generate_learning_path(user.id)
    return success_response(path_data)

@learning_path_bp.route('/regenerate', methods=['POST'])
@require_auth
def regenerate():
    user = get_current_user()
    path_data = generate_learning_path(user.id)
    # Log changelog
    if isinstance(path_data, dict) and 'id' in path_data:
        log = LearningPathChangelog(path_id=path_data['id'], change_reason="User manually regenerated path")
        db.session.add(log)
        db.session.commit()
    return success_response(path_data)

@learning_path_bp.route('/item/<int:id>/unlock', methods=['POST'])
@require_auth
def unlock(id):
    item = LearningPathItem.query.get(id)
    if item:
        item.status = 'unlocked'
        db.session.commit()
    return success_response({"status": "unlocked"})
