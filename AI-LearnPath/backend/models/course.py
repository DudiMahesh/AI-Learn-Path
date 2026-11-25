from . import db

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    difficulty = db.Column(db.String(50))
    career_id = db.Column(db.Integer, db.ForeignKey('careers.id'))

    def to_dict(self):
        return {"id": self.id, "title": self.title, "description": self.description, "difficulty": self.difficulty, "career_id": self.career_id}

class CourseSkill(db.Model):
    __tablename__ = 'course_skills'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))

    def to_dict(self):
        return {"id": self.id, "course_id": self.course_id, "skill_id": self.skill_id}
