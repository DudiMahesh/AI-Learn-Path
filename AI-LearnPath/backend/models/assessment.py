from . import db
from datetime import datetime

class Assessment(db.Model):
    __tablename__ = 'assessments'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(50)) # 'diagnostic' or standard
    career_id = db.Column(db.Integer, db.ForeignKey('careers.id'))

    def to_dict(self):
        return {"id": self.id, "title": self.title, "type": self.type, "career_id": self.career_id}

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    assessment_id = db.Column(db.Integer, db.ForeignKey('assessments.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))
    text = db.Column(db.Text, nullable=False)
    options = db.Column(db.JSON)
    correct_option = db.Column(db.String(255))

    def to_dict(self):
        return {"id": self.id, "assessment_id": self.assessment_id, "skill_id": self.skill_id, "text": self.text, "options": self.options, "correct_option": self.correct_option}

class AssessmentAttempt(db.Model):
    __tablename__ = 'assessment_attempts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    assessment_id = db.Column(db.Integer, db.ForeignKey('assessments.id'))
    score = db.Column(db.Float)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "assessment_id": self.assessment_id, "score": self.score, "started_at": self.started_at.isoformat() if self.started_at else None, "completed_at": self.completed_at.isoformat() if self.completed_at else None}

class AssessmentAnswer(db.Model):
    __tablename__ = 'assessment_answers'
    id = db.Column(db.Integer, primary_key=True)
    attempt_id = db.Column(db.Integer, db.ForeignKey('assessment_attempts.id'))
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    selected_option = db.Column(db.String(255))
    is_correct = db.Column(db.Boolean)

    def to_dict(self):
        return {"id": self.id, "attempt_id": self.attempt_id, "question_id": self.question_id, "selected_option": self.selected_option, "is_correct": self.is_correct}
