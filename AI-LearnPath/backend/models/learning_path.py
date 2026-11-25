from . import db
from datetime import datetime

class LearningPath(db.Model):
    __tablename__ = 'learning_paths'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "created_at": self.created_at.isoformat() if self.created_at else None, "is_active": self.is_active}

class LearningPathItem(db.Model):
    __tablename__ = 'learning_path_items'
    id = db.Column(db.Integer, primary_key=True)
    path_id = db.Column(db.Integer, db.ForeignKey('learning_paths.id'))
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))
    order_index = db.Column(db.Integer)
    status = db.Column(db.String(50), default='locked') # locked, unlocked, completed

    def to_dict(self):
        return {"id": self.id, "path_id": self.path_id, "topic_id": self.topic_id, "order_index": self.order_index, "status": self.status}

class LearningPathChangelog(db.Model):
    __tablename__ = 'learning_path_changelogs'
    id = db.Column(db.Integer, primary_key=True)
    path_id = db.Column(db.Integer, db.ForeignKey('learning_paths.id'))
    change_reason = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "path_id": self.path_id, "change_reason": self.change_reason, "created_at": self.created_at.isoformat() if self.created_at else None}
