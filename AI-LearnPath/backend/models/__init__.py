from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .career import Career
from .skill import Skill, CareerSkill, SkillPrerequisite, UserSkill
from .course import Course, CourseSkill
from .topic import Topic, TopicPrerequisite, LessonProgress
from .lesson import Lesson
from .assessment import Assessment, Question, AssessmentAttempt, AssessmentAnswer
from .learning_path import LearningPath, LearningPathItem, LearningPathChangelog
from .analytics import LearningActivity, ModelPrediction, ClusterAssignment, SkillGapRecord, Recommendation, Notification, UserSettings
from .rag_models import RAGDocument, RAGChunk, RAGConversation, RAGMessage, RAGRetrievalLog
