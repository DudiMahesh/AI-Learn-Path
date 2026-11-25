from flask import Blueprint, request
from utils.auth import require_auth, require_admin, get_current_user
from utils.response import success_response, error_response
from models import db, Course, Topic, Lesson, LessonProgress, LearningActivity, LearningPathItem, Career

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/courses', methods=['GET'])
@require_auth
def list_courses():
    courses = Course.query.all()
    result = []
    for c in courses:
        d = c.to_dict()
        topics = Topic.query.filter_by(course_id=c.id).all()
        d['topics_count'] = len(topics)
        d['topics'] = [t.to_dict() for t in topics]
        d['duration_hours'] = max(2, len(topics) * 3)
        title_lower = (c.title or '').lower()
        if 'biology' in title_lower:
            d['category'] = 'Biology'
            d['pdf_url'] = '/materials/NEET_UG_2026_Biology_Complete_Study_Guide.pdf'
            d['format'] = 'PDF'
            d['pages'] = 84
        elif 'chemistry' in title_lower:
            d['category'] = 'Chemistry'
            d['pdf_url'] = '/materials/NEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf'
            d['format'] = 'PDF'
            d['pages'] = 111
        elif 'physics' in title_lower or 'study guide' in title_lower:
            d['category'] = 'Physics'
            d['pdf_url'] = '/materials/NEET_UG_2026_Physics_Expanded_Study_Guide.pdf'
            d['format'] = 'PDF'
            d['pages'] = 76
        elif c.career_id:
            car = Career.query.get(c.career_id)
            d['category'] = car.name if car else 'General'
        else:
            d['category'] = 'General'

        result.append(d)
    return success_response(result)

@courses_bp.route('/courses', methods=['POST'])
@require_auth
def create_course():
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    if not title:
        return error_response("Course title is required", 400)
    
    course = Course(
        title=title,
        description=data.get('description', ''),
        difficulty=data.get('difficulty', 'beginner'),
        career_id=data.get('career_id')
    )
    db.session.add(course)
    db.session.flush()

    # Optional initial topics
    topics_data = data.get('topics', [])
    for idx, t in enumerate(topics_data):
        topic_title = t.get('title') if isinstance(t, dict) else str(t)
        if topic_title:
            topic = Topic(
                course_id=course.id,
                title=topic_title,
                description=t.get('description', '') if isinstance(t, dict) else '',
                order_index=idx + 1
            )
            db.session.add(topic)
            db.session.flush()

            # Optional lessons for topic
            if isinstance(t, dict) and 'lessons' in t:
                for l_idx, l in enumerate(t.get('lessons', [])):
                    l_title = l.get('title') if isinstance(l, dict) else str(l)
                    l_content = l.get('content', '') if isinstance(l, dict) else f'# {l_title}\n\nWelcome to this lesson.'
                    db.session.add(Lesson(
                        topic_id=topic.id,
                        title=l_title,
                        content=l_content,
                        order_index=l_idx + 1
                    ))

    db.session.commit()
    
    res = course.to_dict()
    res['topics'] = [top.to_dict() for top in Topic.query.filter_by(course_id=course.id).all()]
    return success_response(res, "Course created successfully")

@courses_bp.route('/courses/<int:id>', methods=['GET'])
@require_auth
def get_course(id):
    course = Course.query.get(id)
    if not course:
        return error_response("Course not found", 404)
    data = course.to_dict()
    topics = Topic.query.filter_by(course_id=id).order_by(Topic.order_index).all()
    topics_list = []
    for t in topics:
        t_dict = t.to_dict()
        lessons = Lesson.query.filter_by(topic_id=t.id).order_by(Lesson.order_index).all()
        t_dict['lessons'] = [l.to_dict() for l in lessons]
        topics_list.append(t_dict)
    data['topics'] = topics_list
    data['duration_hours'] = max(2, len(topics) * 3)
    title_lower = (course.title or '').lower()
    if 'biology' in title_lower:
        data['category'] = 'Biology'
        data['pdf_url'] = '/materials/NEET_UG_2026_Biology_Complete_Study_Guide.pdf'
        data['format'] = 'PDF'
        data['pages'] = 84
    elif 'chemistry' in title_lower:
        data['category'] = 'Chemistry'
        data['pdf_url'] = '/materials/NEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf'
        data['format'] = 'PDF'
        data['pages'] = 111
    elif 'physics' in title_lower or 'study guide' in title_lower:
        data['category'] = 'Physics'
        data['pdf_url'] = '/materials/NEET_UG_2026_Physics_Expanded_Study_Guide.pdf'
        data['format'] = 'PDF'
        data['pages'] = 76
    elif course.career_id:
        car = Career.query.get(course.career_id)
        data['category'] = car.name if car else 'General'
    else:
        data['category'] = 'General'

    return success_response(data)

@courses_bp.route('/courses/<int:id>', methods=['DELETE'])
@require_auth
def delete_course(id):
    course = Course.query.get(id)
    if not course:
        return error_response("Course not found", 404)
    topics = Topic.query.filter_by(course_id=id).all()
    for t in topics:
        Lesson.query.filter_by(topic_id=t.id).delete()
    Topic.query.filter_by(course_id=id).delete()
    db.session.delete(course)
    db.session.commit()
    return success_response({"id": id}, "Course deleted successfully")

@courses_bp.route('/topics/<int:id>', methods=['GET'])
@require_auth
def get_topic(id):
    topic = Topic.query.get(id)
    if not topic:
        return error_response("Topic not found", 404)
    data = topic.to_dict()
    lessons = Lesson.query.filter_by(topic_id=id).order_by(Lesson.order_index).all()
    data['lessons'] = [l.to_dict() for l in lessons]
    return success_response(data)

@courses_bp.route('/topics/<int:id>/lessons', methods=['GET'])
@require_auth
def list_lessons(id):
    lessons = Lesson.query.filter_by(topic_id=id).order_by(Lesson.order_index).all()
    return success_response([l.to_dict() for l in lessons])

@courses_bp.route('/lesson/<int:id>', methods=['GET'])
@require_auth
def get_lesson(id):
    lesson = Lesson.query.get(id)
    if not lesson:
        return error_response("Lesson not found", 404)
    data = lesson.to_dict()
    topic = Topic.query.get(lesson.topic_id)
    data['topic_title'] = topic.title if topic else ''
    return success_response(data)

@courses_bp.route('/lesson/<int:id>/complete', methods=['POST'])
@require_auth
def complete_lesson(id):
    user = get_current_user()
    prog = LessonProgress.query.filter_by(user_id=user.id, lesson_id=id).first()
    if not prog:
        prog = LessonProgress(user_id=user.id, lesson_id=id, completed=True)
        db.session.add(prog)
    else:
        prog.completed = True
    
    # Log learning activity (15 mins)
    act = LearningActivity(
        user_id=user.id,
        activity_type='lesson_completed',
        duration_minutes=15
    )
    db.session.add(act)
    db.session.commit()
    return success_response({"success": True, "lesson_id": id, "topic_completed": False})

@courses_bp.route('/topic/<int:id>/complete', methods=['POST'])
@require_auth
def complete_topic(id):
    user = get_current_user()
    lessons = Lesson.query.filter_by(topic_id=id).all()
    for l in lessons:
        p = LessonProgress.query.filter_by(user_id=user.id, lesson_id=l.id).first()
        if not p:
            db.session.add(LessonProgress(user_id=user.id, lesson_id=l.id, completed=True))
        else:
            p.completed = True
    db.session.commit()
    return success_response({"completed": True})
