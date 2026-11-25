from . import db
from datetime import datetime

class RAGDocument(db.Model):
    __tablename__ = 'rag_documents'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    file_path = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "title": self.title, "file_path": self.file_path, "created_at": self.created_at.isoformat()}

class RAGChunk(db.Model):
    __tablename__ = 'rag_chunks'
    id = db.Column(db.Integer, primary_key=True)
    document_id = db.Column(db.Integer, db.ForeignKey('rag_documents.id'))
    content = db.Column(db.Text)
    embedding_id = db.Column(db.String(255))

    def to_dict(self): return {"id": self.id, "document_id": self.document_id, "content": self.content, "embedding_id": self.embedding_id}

class RAGConversation(db.Model):
    __tablename__ = 'rag_conversations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "user_id": self.user_id, "title": self.title, "created_at": self.created_at.isoformat()}

class RAGMessage(db.Model):
    __tablename__ = 'rag_messages'
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('rag_conversations.id'))
    role = db.Column(db.String(50)) # user, assistant
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self): return {"id": self.id, "conversation_id": self.conversation_id, "role": self.role, "content": self.content, "created_at": self.created_at.isoformat()}

class RAGRetrievalLog(db.Model):
    __tablename__ = 'rag_retrieval_logs'
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('rag_messages.id'))
    chunk_id = db.Column(db.Integer, db.ForeignKey('rag_chunks.id'))
    score = db.Column(db.Float)

    def to_dict(self): return {"id": self.id, "message_id": self.message_id, "chunk_id": self.chunk_id, "score": self.score}
