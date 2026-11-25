from models import db
from models.skill import UserSkill, CareerSkill, Skill
from models.analytics import SkillGapRecord
from models.user import User

def calculate_skill_gaps(user_id: int) -> list:
    user = User.query.get(user_id)
    if not user or not user.career_id:
        return []
    
    career_skills = CareerSkill.query.filter_by(career_id=user.career_id).all()
    user_skills = {us.skill_id: us.proficiency_score for us in UserSkill.query.filter_by(user_id=user_id).all()}
    
    gaps = []
    importance_weights = {'critical': 1.5, 'high': 1.2, 'medium': 1.0, 'low': 0.7}
    
    for cs in career_skills:
        skill = Skill.query.get(cs.skill_id)
        if not skill:
            continue
        current = float(user_skills.get(cs.skill_id, 0))
        required = float(cs.target_score)
        gap = max(0, required - current)
        weight = 1.0 # default if no importance attribute
        priority_score = gap * weight
        
        if gap > 0:
            if priority_score > 60: priority = 'critical'
            elif priority_score > 40: priority = 'high'
            elif priority_score > 20: priority = 'medium'
            else: priority = 'low'
        else:
            priority = 'none'
        
        gaps.append({
            'skill_id': cs.skill_id,
            'skill': skill.name,
            'required': required,
            'current': current,
            'gap': gap,
            'priority': priority,
            'priority_score': priority_score
        })
        
        record = SkillGapRecord(
            user_id=user_id,
            skill_id=cs.skill_id,
            gap_score=gap
        )
        db.session.add(record)
    
    try:
        db.session.commit()
    except:
        db.session.rollback()
    
    return sorted(gaps, key=lambda x: x['priority_score'], reverse=True)
