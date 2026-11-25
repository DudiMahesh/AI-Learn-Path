-- ============================================================
-- AI LearnPath - Complete PostgreSQL Database Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CAREERS
-- ============================================================
CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SKILLS
-- ============================================================
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- CAREER-SKILL MAPPING
-- ============================================================
CREATE TABLE IF NOT EXISTS career_skills (
    id SERIAL PRIMARY KEY,
    career_id INTEGER REFERENCES careers(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    target_score INTEGER NOT NULL DEFAULT 70,
    importance VARCHAR(20) DEFAULT 'medium' CHECK (importance IN ('critical','high','medium','low')),
    UNIQUE(career_id, skill_id)
);

-- ============================================================
-- SKILL PREREQUISITES
-- ============================================================
CREATE TABLE IF NOT EXISTS skill_prerequisites (
    id SERIAL PRIMARY KEY,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    prerequisite_skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE(skill_id, prerequisite_skill_id)
);

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    career_id INTEGER REFERENCES careers(id),
    skill_level VARCHAR(50) DEFAULT 'beginner' CHECK (skill_level IN ('beginner','intermediate','advanced')),
    interests TEXT[],
    daily_study_time NUMERIC(4,2) DEFAULT 1.0,
    learning_preference VARCHAR(50) DEFAULT 'visual' CHECK (learning_preference IN ('visual','reading','practice','mixed')),
    preferred_language VARCHAR(50) DEFAULT 'English',
    is_admin BOOLEAN DEFAULT FALSE,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    diagnostic_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- USER SKILLS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_score NUMERIC(5,2) DEFAULT 0,
    source VARCHAR(50) DEFAULT 'assessment' CHECK (source IN ('assessment','activity','self_reported','predicted')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id)
);

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    difficulty VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
    duration_hours NUMERIC(6,2),
    instructor VARCHAR(200),
    thumbnail_url TEXT,
    career_id INTEGER REFERENCES careers(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- COURSE-SKILL MAPPING
-- ============================================================
CREATE TABLE IF NOT EXISTS course_skills (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    relevance_score NUMERIC(4,3) DEFAULT 0.8,
    UNIQUE(course_id, skill_id)
);

-- ============================================================
-- TOPICS
-- ============================================================
CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
    estimated_minutes INTEGER DEFAULT 60,
    order_index INTEGER DEFAULT 0,
    skill_id INTEGER REFERENCES skills(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TOPIC PREREQUISITES
-- ============================================================
CREATE TABLE IF NOT EXISTS topic_prerequisites (
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    prerequisite_topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (topic_id, prerequisite_topic_id)
);

-- ============================================================
-- LESSONS
-- ============================================================
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    lesson_type VARCHAR(50) DEFAULT 'text' CHECK (lesson_type IN ('text','video','exercise','quiz')),
    video_url TEXT,
    duration_minutes INTEGER DEFAULT 15,
    order_index INTEGER DEFAULT 0,
    key_concepts TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- LESSON PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS lesson_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
    progress_pct INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id)
);

-- ============================================================
-- LEARNING PATHS
-- ============================================================
CREATE TABLE IF NOT EXISTS learning_paths (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    career_id INTEGER REFERENCES careers(id),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','archived','draft')),
    generation_reason TEXT
);

-- ============================================================
-- LEARNING PATH ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS learning_path_items (
    id SERIAL PRIMARY KEY,
    learning_path_id INTEGER REFERENCES learning_paths(id) ON DELETE CASCADE,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed','skipped')),
    progress_pct INTEGER DEFAULT 0,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('critical','high','normal','low')),
    is_unlocked BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    UNIQUE(learning_path_id, topic_id)
);

-- ============================================================
-- ASSESSMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assessment_type VARCHAR(50) DEFAULT 'topic' CHECK (assessment_type IN ('diagnostic','topic','career','practice')),
    career_id INTEGER REFERENCES careers(id),
    topic_id INTEGER REFERENCES topics(id),
    time_limit_minutes INTEGER DEFAULT 30,
    passing_score INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- QUESTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER REFERENCES assessments(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A','B','C','D')),
    skill_id INTEGER REFERENCES skills(id),
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy','medium','hard')),
    explanation TEXT,
    order_index INTEGER DEFAULT 0
);

-- ============================================================
-- ASSESSMENT ATTEMPTS
-- ============================================================
CREATE TABLE IF NOT EXISTS assessment_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assessment_id INTEGER REFERENCES assessments(id) ON DELETE CASCADE,
    attempt_number INTEGER DEFAULT 1,
    score NUMERIC(5,2),
    total_questions INTEGER,
    correct_answers INTEGER,
    time_taken_minutes INTEGER,
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','abandoned')),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- ============================================================
-- ASSESSMENT ANSWERS
-- ============================================================
CREATE TABLE IF NOT EXISTS assessment_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    selected_option CHAR(1) CHECK (selected_option IN ('A','B','C','D')),
    is_correct BOOLEAN,
    time_taken_seconds INTEGER,
    UNIQUE(attempt_id, question_id)
);

-- ============================================================
-- RESOURCES
-- ============================================================
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    resource_type VARCHAR(50) DEFAULT 'article' CHECK (resource_type IN ('video','article','book','documentation','practice','dataset','course')),
    url TEXT,
    topic_id INTEGER REFERENCES topics(id),
    skill_id INTEGER REFERENCES skills(id),
    difficulty VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
    duration_minutes INTEGER,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- RECOMMENDATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('course','topic','resource')),
    item_id INTEGER NOT NULL,
    recommendation_score NUMERIC(5,4) DEFAULT 0,
    reason TEXT,
    skill_gap_addressed INTEGER REFERENCES skills(id),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','accepted','completed','dismissed')),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SKILL GAP RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS skill_gap_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    required_score NUMERIC(5,2) NOT NULL,
    current_score NUMERIC(5,2) NOT NULL,
    gap NUMERIC(5,2) NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('critical','high','medium','low')),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- LEARNING ACTIVITY
-- ============================================================
CREATE TABLE IF NOT EXISTS learning_activity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('lesson_view','lesson_complete','topic_complete','assessment_start','assessment_complete','resource_view','ai_chat')),
    topic_id INTEGER REFERENCES topics(id),
    lesson_id INTEGER REFERENCES lessons(id),
    assessment_id INTEGER REFERENCES assessments(id),
    duration_minutes INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- MODEL PREDICTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS model_predictions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    model_name VARCHAR(100) NOT NULL,
    prediction VARCHAR(100),
    confidence NUMERIC(5,4),
    input_features JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- CLUSTER ASSIGNMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS cluster_assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    cluster_id INTEGER,
    cluster_label VARCHAR(100),
    cluster_description TEXT,
    features_used JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- RAG DOCUMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS rag_documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    source_type VARCHAR(50) DEFAULT 'text' CHECK (source_type IN ('pdf','txt','markdown','html','manual')),
    source_path TEXT,
    course_id INTEGER REFERENCES courses(id),
    topic_id INTEGER REFERENCES topics(id),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','processing','indexed','failed')),
    chunk_count INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- RAG CHUNKS
-- ============================================================
CREATE TABLE IF NOT EXISTS rag_chunks (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES rag_documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    token_count INTEGER,
    metadata JSONB,
    vector_reference VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- RAG CONVERSATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS rag_conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(500) DEFAULT 'New Conversation',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- RAG MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS rag_messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES rag_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user','assistant','system')),
    content TEXT NOT NULL,
    sources JSONB,
    retrieval_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- RAG RETRIEVAL LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS rag_retrieval_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message_id INTEGER REFERENCES rag_messages(id) ON DELETE CASCADE,
    chunk_id INTEGER REFERENCES rag_chunks(id),
    relevance_score NUMERIC(5,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- LEARNING PATH CHANGE LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS learning_path_changelog (
    id SERIAL PRIMARY KEY,
    learning_path_id INTEGER REFERENCES learning_paths(id) ON DELETE CASCADE,
    change_type VARCHAR(100),
    change_reason TEXT,
    triggered_by VARCHAR(100),
    old_version INTEGER,
    new_version INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    notification_type VARCHAR(50) DEFAULT 'info' CHECK (notification_type IN ('info','success','warning','recommendation','achievement')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- USER SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    reminder_time TIME DEFAULT '09:00:00',
    theme VARCHAR(20) DEFAULT 'light',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_career ON users(career_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_user ON assessment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_path_user ON learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_gap_user ON skill_gap_records(user_id);
CREATE INDEX IF NOT EXISTS idx_rag_chunks_doc ON rag_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_rag_messages_conv ON rag_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_learning_activity_user ON learning_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
