from . import db
from datetime import datetime

class LearningActivity(db.Model):
    __tablename__ = 'learning_activities'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    activity_type = db.Column(db.String(100))
    duration_minutes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "activity_type": self.activity_type, "duration_minutes": self.duration_minutes, "created_at": self.created_at.isoformat()}

class ModelPrediction(db.Model):
    __tablename__ = 'model_predictions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    prediction_data = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "prediction_data": self.prediction_data, "created_at": self.created_at.isoformat()}

class ClusterAssignment(db.Model):
    __tablename__ = 'cluster_assignments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    cluster_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "cluster_id": self.cluster_id, "created_at": self.created_at.isoformat()}

class SkillGapRecord(db.Model):
    __tablename__ = 'skill_gap_records'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))
    gap_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "skill_id": self.skill_id, "gap_score": self.gap_score, "created_at": self.created_at.isoformat()}

class Recommendation(db.Model):
    __tablename__ = 'recommendations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    item_type = db.Column(db.String(50))
    item_id = db.Column(db.Integer)
    reason = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "item_type": self.item_type, "item_id": self.item_id, "reason": self.reason, "created_at": self.created_at.isoformat()}

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(255))
    message = db.Column(db.Text)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "title": self.title, "message": self.message, "is_read": self.is_read, "created_at": self.created_at.isoformat()}

class UserSettings(db.Model):
    __tablename__ = 'user_settings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    settings = db.Column(db.JSON)

    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "settings": self.settings}
