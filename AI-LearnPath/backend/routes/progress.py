from flask import Blueprint
from utils.auth import require_auth, get_current_user
from utils.response import success_response
from services.progress_service import calculate_overall_progress, get_user_analytics
from models import LearningActivity

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/progress', methods=['GET'])
@require_auth
def progress():
    user = get_current_user()
    return success_response({"overall_progress": calculate_overall_progress(user.id)})

@progress_bp.route('/analytics', methods=['GET'])
@require_auth
def analytics():
    user = get_current_user()
    analytics_data = get_user_analytics(user.id)
    return success_response(analytics_data)

@progress_bp.route('/activity', methods=['GET'])
@require_auth
def activity():
    user = get_current_user()
    activities = [a.to_dict() for a in LearningActivity.query.filter_by(user_id=user.id).order_by(LearningActivity.created_at.desc()).limit(20).all()]
    return success_response(activities)

@progress_bp.route('/career-readiness', methods=['GET'])
@require_auth
def career_readiness():
    user = get_current_user()
    analytics_data = get_user_analytics(user.id)
    readiness = min(100, int((analytics_data.get('overall_progress', 0) * 0.6) + (min(analytics_data.get('assessment_count', 0) * 20, 40))))
    return success_response({
        "readiness_score": readiness,
        "overall_progress": analytics_data.get('overall_progress', 0),
        "assessments_completed": analytics_data.get('assessment_count', 0),
        "completed_topics": analytics_data.get('completed_topics', 0),
        "study_hours": analytics_data.get('study_hours_total', 0)
    })
