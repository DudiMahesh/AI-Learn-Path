from . import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='student')
    career_id = db.Column(db.Integer, db.ForeignKey('careers.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        career_name = None
        has_diagnostic = False
        try:
            from .career import Career
            from .assessment import AssessmentAttempt, Assessment
            if self.career_id:
                career_obj = Career.query.get(self.career_id)
                if career_obj:
                    career_name = career_obj.name

            if not career_name or 'data scientist' in str(career_name).lower():
                career_name = "NEET (UG) 2026 Aspirant"

            # Check if user has completed a diagnostic attempt
            attempt = AssessmentAttempt.query.join(
                Assessment, AssessmentAttempt.assessment_id == Assessment.id
            ).filter(
                AssessmentAttempt.user_id == self.id,
                Assessment.type == 'diagnostic',
                AssessmentAttempt.completed_at.isnot(None)
            ).first()
            has_diagnostic = (attempt is not None)
        except Exception:
            pass

        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "is_admin": self.role in ('admin', 'super_admin'),
            "is_super_admin": self.role == 'super_admin',
            "career_id": self.career_id,
            "career": career_name,
            "career_goal": career_name,
            "diagnostic_completed": has_diagnostic,
            "onboarding_completed": (self.career_id is not None),
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
