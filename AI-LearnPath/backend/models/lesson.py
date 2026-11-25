from . import db

class Lesson(db.Model):
    __tablename__ = 'lessons'
    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text)
    order_index = db.Column(db.Integer)

    def to_dict(self):
        return {"id": self.id, "topic_id": self.topic_id, "title": self.title, "content": self.content, "order_index": self.order_index}
