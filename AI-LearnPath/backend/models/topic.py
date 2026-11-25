from . import db

class Topic(db.Model):
    __tablename__ = 'topics'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    order_index = db.Column(db.Integer)

    def to_dict(self):
        return {"id": self.id, "course_id": self.course_id, "title": self.title, "description": self.description, "order_index": self.order_index}

class TopicPrerequisite(db.Model):
    __tablename__ = 'topic_prerequisites'
    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))
    prerequisite_id = db.Column(db.Integer, db.ForeignKey('topics.id'))

    def to_dict(self):
        return {"id": self.id, "topic_id": self.topic_id, "prerequisite_id": self.prerequisite_id}

class LessonProgress(db.Model):
    __tablename__ = 'lesson_progress'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "lesson_id": self.lesson_id, "completed": self.completed}
