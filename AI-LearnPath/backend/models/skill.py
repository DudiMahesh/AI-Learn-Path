from . import db
from datetime import datetime

class Skill(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "description": self.description}

class CareerSkill(db.Model):
    __tablename__ = 'career_skills'
    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey('careers.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))
    target_score = db.Column(db.Float)

    def to_dict(self):
        return {"id": self.id, "career_id": self.career_id, "skill_id": self.skill_id, "target_score": self.target_score}

class SkillPrerequisite(db.Model):
    __tablename__ = 'skill_prerequisites'
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))
    prerequisite_id = db.Column(db.Integer, db.ForeignKey('skills.id'))

    def to_dict(self):
        return {"id": self.id, "skill_id": self.skill_id, "prerequisite_id": self.prerequisite_id}

class UserSkill(db.Model):
    __tablename__ = 'user_skills'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))
    proficiency_score = db.Column(db.Float)
    last_assessed = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "skill_id": self.skill_id, "proficiency_score": self.proficiency_score, "last_assessed": self.last_assessed.isoformat() if self.last_assessed else None}
