import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///ailearnpath.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 60,        # Recycle connections every 60s for Neon serverless
        "pool_size": 2,
        "max_overflow": 3,
        "pool_timeout": 30,
        "connect_args": {"sslmode": "require", "connect_timeout": 10} if "neon.tech" in os.getenv("DATABASE_URL", "") else {}
    }
    JWT_SECRET_KEY = os.getenv('JWT_SECRET', 'super-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    LLM_PROVIDER = os.getenv('LLM_PROVIDER', 'groq')
    LLM_MAX_TOKENS = int(os.getenv('LLM_MAX_TOKENS', '7500'))
    GROQ_API_KEY = os.getenv('GROQ_API_KEY') or os.getenv('LLM_API_KEY', '')
    GROQ_MODEL = os.getenv('GROQ_MODEL', 'openai/gpt-oss-120b')
    GROK_API_KEY = os.getenv('GROK_API_KEY') or os.getenv('XAI_API_KEY', '')
    GROK_MODEL = os.getenv('GROK_MODEL', 'grok-2-latest')
    LLM_API_KEY = os.getenv('GROQ_API_KEY') or os.getenv('GROK_API_KEY') or os.getenv('LLM_API_KEY', '')
    EMBEDDING_PROVIDER = os.getenv('EMBEDDING_PROVIDER', 'sentence_transformer')
    EMBEDDING_API_KEY = os.getenv('EMBEDDING_API_KEY', '')
    VECTOR_DB_PATH = os.getenv('VECTOR_DB_PATH', './rag/chroma_db')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'admin@ailearnpath.com').strip().lower()
    ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')
    SUPER_ADMIN_EMAIL = os.getenv('SUPER_ADMIN_EMAIL', 'superadmin@ailearnpath.com').strip().lower()
    SUPER_ADMIN_PASSWORD = os.getenv('SUPER_ADMIN_PASSWORD', 'superadmin123')
