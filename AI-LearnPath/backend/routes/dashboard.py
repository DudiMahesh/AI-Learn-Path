from flask import Blueprint
from utils.auth import require_auth, get_current_user
from utils.response import success_response
from models import db, LearningPath, LearningPathItem, UserSkill, LearningActivity, ClusterAssignment, Recommendation, SkillGapRecord, Notification, Career

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('', methods=['GET'])
@require_auth
def get_dashboard():
    user = get_current_user()
    career = Career.query.get(user.career_id) if user.career_id else None
    c_name = career.name if career else "NEET (UG) 2026 Aspirant"
    if 'data scientist' in c_name.lower():
        c_name = "NEET (UG) 2026 Aspirant"
    
    # Path stats
    path = LearningPath.query.filter_by(user_id=user.id, is_active=True).first()
    completed_topics = 0
    total_topics = 0
    overall_progress = 0.0
    if path:
        items = LearningPathItem.query.filter_by(path_id=path.id).all()
        total_topics = len(items)
        completed_topics = sum(1 for i in items if i.status == 'completed')
        overall_progress = (completed_topics / total_topics * 100) if total_topics > 0 else 0
        
    # Skill score
    user_skills = UserSkill.query.filter_by(user_id=user.id).all()
    skill_score = sum(us.proficiency_score for us in user_skills) / len(user_skills) if user_skills else None
    
    # Activities
    recent_activity = [a.to_dict() for a in LearningActivity.query.filter_by(user_id=user.id).order_by(LearningActivity.created_at.desc()).limit(5).all()]
    
    # Profile
    cluster = ClusterAssignment.query.filter_by(user_id=user.id).order_by(ClusterAssignment.created_at.desc()).first()
    
    # Gaps & Recs
    gaps = [g.to_dict() for g in SkillGapRecord.query.filter_by(user_id=user.id).order_by(SkillGapRecord.gap_score.desc()).limit(3).all()]
    recs = [r.to_dict() for r in Recommendation.query.filter_by(user_id=user.id).order_by(Recommendation.created_at.desc()).limit(3).all()]
    
    unread = Notification.query.filter_by(user_id=user.id, is_read=False).count()
    
    return success_response({
        "greeting_info": {"name": user.name},
        "career_name": c_name,
        "career": c_name,
        "overall_progress": overall_progress,
        "completed_topics": completed_topics,
        "total_topics": total_topics,
        "skill_score": skill_score,
        "daily_study_time_avg": 2.5, # mocked
        "current_streak": 3, # mocked
        "learning_profile": cluster.to_dict() if cluster else None,
        "recent_activity": recent_activity,
        "top_recommendations": recs,
        "skill_gaps": gaps,
        "diagnostic_completed": getattr(user, 'diagnostic_completed', False),
        "onboarding_completed": getattr(user, 'onboarding_completed', False),
        "notifications": unread
    })
