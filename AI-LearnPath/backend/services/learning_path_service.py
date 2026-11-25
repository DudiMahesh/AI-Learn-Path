from models import db
from models.user import User
from models.learning_path import LearningPath, LearningPathItem
from models.course import Course
from models.topic import Topic, TopicPrerequisite
from services.skill_gap_service import calculate_skill_gaps

def generate_learning_path(user_id: int) -> dict:
    user = User.query.get(user_id)
    if not user or not user.career_id:
        return {'error': 'User has no career goal set'}
    
    # Archive existing active paths
    existing = LearningPath.query.filter_by(user_id=user_id, is_active=True).all()
    for old_path in existing:
        old_path.is_active = False
    db.session.flush()
    
    # Get all topics for this career (via courses)
    courses = Course.query.filter_by(career_id=user.career_id).all()
    course_ids = [c.id for c in courses]
    
    if not course_ids:
        all_topics = Topic.query.limit(10).all()
    else:
        all_topics = Topic.query.filter(Topic.course_id.in_(course_ids)).order_by(Topic.order_index).all()
    
    if not all_topics:
        return {'error': 'No learning content found'}
    
    # Create learning path
    path = LearningPath(
        user_id=user_id,
        is_active=True
    )
    db.session.add(path)
    db.session.flush()
    
    for idx, topic in enumerate(all_topics):
        is_unlocked = idx == 0
        
        item = LearningPathItem(
            path_id=path.id,
            topic_id=topic.id,
            order_index=idx + 1,
            status='unlocked' if is_unlocked else 'locked'
        )
        db.session.add(item)
    
    try:
        db.session.commit()
        return path.to_dict()
    except Exception as e:
        db.session.rollback()
        raise e
