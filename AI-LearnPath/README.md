# AI LearnPath 🎓

> **Your Personalized Learning Journey**

An AI-powered career learning platform that assesses students, predicts their skill levels, identifies skill gaps, recommends relevant learning content, generates and adapts personalized learning paths, and provides a RAG-powered learning assistant grounded in trusted educational content.

**MCA Final Year Project** | Full-Stack AI EdTech Platform

---

## 📋 Table of Contents

- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Solution Overview](#solution-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [ML Algorithms](#ml-algorithms)
- [RAG Architecture](#rag-architecture)
- [Database](#database)
- [API Reference](#api-reference)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Training ML Models](#training-ml-models)
- [Ingesting RAG Documents](#ingesting-rag-documents)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Deployment](#deployment)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)

---

## ❓ Problem Statement

Traditional online learning platforms provide a one-size-fits-all approach to education. Students waste time learning what they already know or miss foundational skills required for their career goals. There is no intelligent assessment, no personalized path, and no adaptive mechanism that responds to individual progress.

---

## 🎯 Objectives

1. Automatically assess a student's current skill level through career-specific diagnostic assessments
2. Use machine learning to predict performance and identify learning profiles
3. Perform skill-gap analysis comparing current skills to career requirements
4. Recommend learning content using NLP-based similarity (TF-IDF + Cosine)
5. Generate a personalized, prerequisite-aware learning roadmap
6. Continuously adapt the roadmap as the student progresses
7. Provide a RAG-powered AI assistant grounded in the platform's knowledge base

---

## 💡 Solution Overview

```
New User → Registration → Career Goal → Profile Setup → Diagnostic Quiz
         → Random Forest (Skill Prediction) → K-Means (Learning Profile)
         → Skill Gap Analysis → TF-IDF + Cosine (Recommendations)
         → Personalized Learning Path → Learning → Assessment
         → Adaptive Engine → Updated Path → RAG Learning Assistant
         → Grounded Explanations with Source References
```

---

## ✨ Features

### NEET (UG) 2026 Medical Entrance Suite
- **Single-Page PDF Study Material Reader** — Dark theme (`#323232`), A4 paper sheet canvas, 16px custom scrollbar, floating zoom toolbar (50%–200%), and bottom navigation pill.
- **20-Unit Syllabus & Sub-Topic Checklist** — Interactive slide-out drawer tracking completion of all 20 units and individual concepts with progress counters.
- **Unit Mastery Quizzes (10+ Questions/Unit)** — Dedicated chapter quizzes with instant evaluation, explanations, and $\ge 70\%$ unit completion unlocks.
- **Official NEET Previous Year Papers (PYQs)** — Authentic NTA papers for 2024 (Code Q1), 2023 (Code E1), 2022 (Code T4), and 2021 (Code M1).
- **50-Question Model Practice Papers** — Full 50-question examination tests for Physics, Chemistry, Biology (Botany & Zoology), and Grand Mocks.
- **Dedicated NEET AI Tutor** — Subject-specialized chat assistant for Physics numericals, Chemistry reaction mechanisms, and Biology NCERT concepts.
- **Interactive High-Yield Formula Sheets** — Instant formula references with symbols, units, and common trap highlights.

### Core AI Features
- **Career-Specific Diagnostic Assessment** — Different quiz for each career goal
- **Random Forest Skill Prediction** — Classifies student as Beginner/Intermediate/Advanced
- **K-Means Learning Profiling** — Clusters students into Foundation/Skill Builder/Advanced Learner
- **Skill Gap Analysis** — Compares required vs current skill levels per career
- **TF-IDF + Cosine Recommendation Engine** — Matches student needs to course content
- **Adaptive Learning Engine** — Adjusts learning path based on assessment performance
- **RAG Learning Assistant** — Answers questions using the platform's indexed knowledge base

### Platform Features
- Dynamic time-based greeting (Morning/Afternoon/Evening/Night)
- Personalized learning path with prerequisites
- Real-time progress tracking (no fake data)
- Career readiness assessment
- What-If scenario simulator
- Admin knowledge base management
- Full assessment history with improvement tracking
- Learning activity calendar

---

## 🏗️ Architecture

```
                    ┌─────────────────┐
                    │     Student     │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ React Frontend  │  (Vite + Tailwind + Recharts)
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │   Flask API     │  (JWT + SQLAlchemy)
                    └────────┬────────┘
                             │
            ┌────────────────┼─────────────────┐
            ↓                ↓                 ↓
     PostgreSQL           ML Engine        RAG Engine
      (NeonDB)                                 │
            │         ┌──────┼──────┐          │
            │         ↓      ↓      ↓          │
            │       RF    KMeans   TF-IDF      │
            │                            ┌─────┴─────┐
            │                            ↓           ↓
            │                       Embeddings   ChromaDB
            │                            ↓           ↓
            │                         Retrieval ←───┘
            │                            ↓
            │                      Gemini LLM
            │                            ↓
            └──────────────┬─────────────┘
                           ↓
                 Personalized Experience
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Recharts, Lucide React |
| **Backend** | Python, Flask 3.0, Flask-CORS, Flask-JWT-Extended |
| **Database** | PostgreSQL (NeonDB cloud) / SQLAlchemy ORM |
| **ML** | scikit-learn, Pandas, NumPy, joblib |
| **RAG** | ChromaDB, Google Gemini (embeddings + LLM), sentence-transformers (fallback) |
| **Auth** | JWT, bcrypt password hashing |
| **Deployment** | Vercel (frontend), Render (backend), NeonDB (database) |
| **Version Control** | Git + GitHub |

---

## 🤖 ML Algorithms

### 1. Random Forest Classifier
**Purpose:** Predict student performance/skill level category

**Input Features:**
- Subject assessment scores (per skill)
- Daily study time
- Number of previous assessment attempts
- Topic completion rate

**Output:** Skill category (Beginner / Intermediate / Advanced)

**Training:** Trained on synthetic student data (clearly documented as synthetic).
See `ml/random_forest/train_rf.py` for training pipeline.

**Evaluation Metrics:** Accuracy, Precision, Recall, F1-Score (on held-out test set)

> ⚠️ **Note:** Training data is synthetic. Real-world performance depends on actual user data.

---

### 2. K-Means Clustering
**Purpose:** Identify student learning profiles

**Input Features:**
- Average skill scores
- Study time per day
- Topic completion rate
- Assessment performance

**Output:** Learning Profile (Foundation Learner / Skill Builder / Advanced Learner)

**Cluster Interpretation:** Cluster labels are assigned by analyzing centroid values — not assumed from cluster IDs. The cluster with highest average scores is labeled "Advanced Learner", etc.

**Evaluation:** Silhouette Score, Inertia, Elbow Analysis

See `ml/kmeans/train_kmeans.py` for training pipeline.

---

### 3. TF-IDF + Cosine Similarity (Recommendation Engine)
**Purpose:** Match student needs to relevant courses and topics

**Process:**
1. Build TF-IDF matrix from course titles, descriptions, and skill tags
2. Construct a query string from: career goal + skill gaps + current skills + interests
3. Transform query with fitted TF-IDF vectorizer
4. Compute cosine similarity between query and all courses
5. Combine similarity score with: skill gap importance, career relevance, prerequisite status
6. Return ranked recommendations with explanations

**Output:** Ranked list of courses/topics with recommendation score and reason

See `ml/recommendation/` for implementation.

---

### 4. Skill Gap Analysis Engine
**Purpose:** Compare career requirements to student's current skill levels

**Process:**
- For each skill required by the target career: `gap = required_score - current_score`
- Priority: Critical gaps (large gap + high importance) are flagged first
- Results feed into recommendations and learning path generation

---

### 5. Adaptive Learning Engine
**Purpose:** Modify the learning path based on assessment performance

**Rules:**
- Score < 50%: Add prerequisite/reinforcement topics to the path
- Score 50–75%: Continue with current path, add practice resources
- Score > 75%: Unlock next topic, consider advanced content if prerequisites met

**Rules are configurable** in `ml/adaptive_engine.py`

---

## 📚 RAG Architecture

### Pipeline
```
Documents (PDF/TXT/MD/HTML)
    ↓
Document Loader (PyMuPDF, BeautifulSoup)
    ↓
Text Cleaning
    ↓
Text Chunking (512 tokens, 50 token overlap)
    ↓
Embeddings (Gemini / sentence-transformers)
    ↓
ChromaDB (persistent vector store)
    ↓
Similarity Search (cosine similarity, score threshold 0.3)
    ↓
Top-K Chunks + Metadata Filtering
    ↓
Prompt Construction (system prompt + context + history + query)
    ↓
LLM (Gemini 1.5 Flash)
    ↓
Grounded Answer + Source References
```

### Hallucination Control
- Minimum relevance score threshold (0.3): if no chunks meet threshold → fallback message
- System prompt instructs LLM not to fabricate platform-specific facts
- Source references displayed for transparency
- Clearly distinguished: knowledge-base answers vs general explanations

### Modularity
- `EmbeddingProvider` abstract interface → swap providers via `EMBEDDING_PROVIDER` env var
- `VectorStore` abstract interface → swap from ChromaDB to FAISS without app changes
- `LLMProvider` abstract interface → swap from Gemini to OpenAI via `LLM_PROVIDER` env var

---

## 🗄️ Database

PostgreSQL with 30+ tables. Key tables:

| Table | Purpose |
|-------|---------|
| `users` | User accounts and profile |
| `careers` | Career goals (Data Scientist, Web Developer, etc.) |
| `skills` | Individual skills with categories |
| `career_skills` | Required skill levels per career |
| `user_skills` | Student's current skill proficiency |
| `courses`, `topics`, `lessons` | Learning content hierarchy |
| `assessments`, `questions` | Quiz definitions |
| `assessment_attempts`, `assessment_answers` | Student quiz history |
| `learning_paths`, `learning_path_items` | Personalized roadmaps |
| `skill_gap_records` | Calculated skill gaps |
| `recommendations` | AI recommendations history |
| `model_predictions` | RF prediction log |
| `cluster_assignments` | K-Means cluster log |
| `rag_documents`, `rag_chunks` | RAG knowledge base metadata |
| `rag_conversations`, `rag_messages` | AI chat history |
| `learning_activity` | Usage tracking |
| `notifications` | User notifications |

Full schema: `database/schema.sql`

---

## 📡 API Reference

### Authentication
```
POST /api/auth/register    Register new user
POST /api/auth/login       Login, receive JWT
GET  /api/auth/me          Get current user
```

### Dashboard & Profile
```
GET /api/dashboard         Full dashboard data
GET /api/profile           User profile
PUT /api/profile           Update profile
```

### Assessments
```
GET  /api/assessment/diagnostic         Get diagnostic quiz for career
POST /api/assessment/diagnostic/start   Start attempt
POST /api/assessment/diagnostic/submit  Submit answers → triggers ML pipeline
GET  /api/assessment/history            All past attempts
GET  /api/assessment/<id>/questions     Quiz questions
POST /api/assessment/<id>/submit        Submit topic quiz
```

### Learning Path
```
GET  /api/learning-path         Get active path
POST /api/learning-path/generate    Generate after diagnostic
POST /api/learning-path/regenerate  Regenerate (archives old)
```

### Courses & Progress
```
GET  /api/courses               Course library (with filters)
GET  /api/courses/<id>          Course detail
GET  /api/topics/<id>           Topic detail with lessons
POST /api/lesson/<id>/complete  Mark lesson complete
POST /api/topic/<id>/complete   Mark topic complete
```

### AI Features
```
GET  /api/recommendations       Personalized recommendations
GET  /api/ai-insights           All AI insights
GET  /api/career-readiness      Career readiness data
POST /api/what-if               What-if scenario simulation
```

### RAG Chat
```
POST /api/rag/chat                    Send message, get answer + sources
POST /api/rag/conversations           New conversation
GET  /api/rag/conversations           List conversations
GET  /api/rag/conversations/<id>      Get conversation + messages
DELETE /api/rag/conversations/<id>    Delete conversation
PUT  /api/rag/conversations/<id>/rename  Rename
```

### Admin
```
POST /api/rag/documents/upload    Upload RAG document
GET  /api/rag/documents           List documents
DELETE /api/rag/documents/<id>    Delete document
POST /api/rag/documents/reindex   Reindex all

GET  /api/admin/stats             System statistics
GET  /api/admin/users             User list
CRUD /api/admin/careers           Career management
CRUD /api/admin/courses           Course management
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (or NeonDB account)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/AI-LearnPath.git
cd AI-LearnPath
```

### 2. Database Setup
```bash
# Set your database URL
export DATABASE_URL="postgresql://user:pass@host/dbname"

# Initialize database
python database/init_db.py
# Answer 'y' to load seed data
```

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env
# Edit .env with your values

python app.py
# Backend runs at http://localhost:5000
```

### 4. Train ML Models
```bash
cd ml

# Generate synthetic training data
python data/synthetic_data_generator.py

# Train all models
python train_random_forest.py
python train_kmeans.py
python build_recommendation_index.py

# Evaluate models
python evaluate_models.py
```

### 5. Ingest RAG Knowledge Base
```bash
# From project root
python rag/ingest_knowledge_base.py
```

### 6. Frontend Setup
```bash
cd frontend
npm install

# Copy and configure
cp .env.example .env.local
# Set VITE_API_BASE_URL=http://localhost:5000

npm run dev
# Frontend runs at http://localhost:3000
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
LLM_PROVIDER=gemini
LLM_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-flash
LLM_MODEL=gemini-1.5-flash
EMBEDDING_PROVIDER=gemini
GEMINI_EMBEDDING_MODEL=models/text-embedding-004
EMBEDDING_MODEL=models/text-embedding-004
VECTOR_DB_PATH=./rag/chroma_db
FLASK_ENV=development
FLASK_DEBUG=True
```

### Frontend (`frontend/.env.local`)
```
VITE_API_BASE_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files to Git.** They are in `.gitignore`.

### Getting API Keys (Free Tier)

**Google Gemini (LLM + Embeddings):**
1. Visit [ai.google.dev](https://ai.google.dev)
2. Create a project → Get API key
3. Set `LLM_API_KEY` and optionally `EMBEDDING_API_KEY`

**Without any API key:**
- Set `EMBEDDING_PROVIDER=sentence_transformer` (uses local model, no API key needed)
- Set `LLM_PROVIDER=gemini` but leave `LLM_API_KEY` empty → RAG returns informative fallback message

---

## 🤖 Training ML Models

All ML models are pre-trained on **synthetic data** and saved to `ml/models/`. The backend loads them at startup.

```bash
cd ml

# Step 1: Generate synthetic training data
python data/synthetic_data_generator.py
# Creates ml/data/synthetic_students.csv
# NOTE: This is SYNTHETIC data, not real educational data.

# Step 2: Train Random Forest
python train_random_forest.py
# Saves ml/models/random_forest_model.joblib
# Prints: accuracy, precision, recall, F1

# Step 3: Train K-Means
python train_kmeans.py
# Saves ml/models/kmeans_model.joblib
# Saves ml/models/cluster_labels.json
# Prints: silhouette score, cluster sizes

# Step 4: Build TF-IDF Index
python build_recommendation_index.py
# Saves ml/models/tfidf_vectorizer.joblib
# Saves ml/models/tfidf_matrix.npy
# Saves ml/models/course_metadata.json

# Step 5: Evaluate (optional but recommended)
python evaluate_models.py
# Prints evaluation report
# Saves ml/evaluation/evaluation_report.json
```

> ⚠️ **All metrics are on synthetic data.** Real-world model performance requires real user data.

---

## 📖 Ingesting RAG Documents

```bash
# Ingest all sample documents from rag/knowledge_base/sample_documents/
python rag/ingest_knowledge_base.py

# The admin panel also supports uploading documents via the web UI:
# Login as admin → AI LearnPath Admin → Knowledge Base → Upload Document

# Supported formats: PDF, TXT, Markdown, HTML
```

---

## 🧪 Testing & Verification

The project includes an automated test suite, segregated ML benchmark scripts, and an empirical RAG grounding evaluation suite compliant with the 10 Workspace Rules ([`docs/WORKSPACE_RULES.md`](docs/WORKSPACE_RULES.md)).

### 1. Automated Test Suite (20 Tests across Scoring, ML, RAG, and APIs)
```bash
# Run all unit and integration tests from the project root:
python run_tests.py
```
- **Test Modules Covered:**
  - `tests/test_scoring_engine.py`: NTA NEET marking rules (+4 / -1 / 0), 50-question papers, Section B attempt caps, and edge cases.
  - `tests/test_adaptive_path.py`: Random Forest student tier inference, KMeans learner clustering, backward compatibility, and DAG prerequisite verification.
  - `tests/test_rag_pipeline.py`: Sentence chunking, token cleaning, groundedness scoring, and relevance matching.
  - `tests/test_api_endpoints.py`: Flask health check, JWT authentication enforcement, and CORS preflight.

### 2. ML Model Benchmark Suite
```bash
# Evaluates Random Forest and KMeans models (Segregated Synthetic & Real Cohorts):
python ml/evaluate_models.py
```
- Full benchmark report: [`docs/ML_BENCHMARK_RESULTS.md`](docs/ML_BENCHMARK_RESULTS.md)

### 3. NEET RAG Retrieval & Grounding Evaluation
```bash
# Measures Top-K Hit Rate, MRR, Precision@K, and syllabus groundedness across 30 authentic queries:
python rag/evaluate_rag.py
```
- Full evaluation report: [`docs/RAG_EVALUATION_RESULTS.md`](docs/RAG_EVALUATION_RESULTS.md)

### Manual End-to-End Test
1. Register as **Student A** → Career: Data Scientist → Take diagnostic (answer Python questions correctly, Statistics poorly)
2. Register as **Student B** → Career: Data Scientist → Take diagnostic (answer Statistics correctly, Python poorly)
3. Compare their learning paths → Paths must differ
4. Complete a topic as Student A → Verify progress updates
5. Take an assessment with score < 50% → Verify adaptive engine adds reinforcement
6. Ask the AI Assistant: "Why do I need Statistics before ML?" → Verify RAG returns grounded answer with sources

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build

# Install Vercel CLI
npm i -g vercel
vercel

# Set environment variable in Vercel dashboard:
# VITE_API_BASE_URL = https://your-backend.onrender.com
```

### Backend → Render
1. Create account at [render.com](https://render.com)
2. New → Web Service → Connect GitHub repo
3. Root directory: `backend/`
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn 'app:create_app()' --bind 0.0.0.0:$PORT`
6. Add environment variables from `backend/.env.example`

### Database → NeonDB
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy connection string (Database URL)
4. Set as `DATABASE_URL` in Render environment
5. Run `python database/init_db.py` to initialize schema

### Vector Store on Render
ChromaDB runs in persistent local mode. On Render, use a persistent disk:
- Mount path: `/opt/render/project/src/chroma_db`
- Set `VECTOR_DB_PATH=/opt/render/project/src/chroma_db`

Alternatively, use ChromaDB Cloud or migrate to a cloud-compatible vector DB.

---

## ⚠️ Limitations

1. **Synthetic Training Data:** Random Forest and K-Means are trained on synthetic data. Model quality improves significantly with real user data.

2. **Recommendation Quality:** TF-IDF recommendations depend on the quality and richness of course metadata. More detailed course descriptions improve recommendation accuracy.

3. **K-Means Cluster Interpretation:** Cluster labels are assigned by centroid analysis but may shift if the training data distribution changes. Revalidate clusters when retraining.

4. **RAG Quality:** The AI Learning Assistant's answer quality depends on: (a) the quality of indexed knowledge documents, (b) the relevance of retrieved chunks, and (c) the LLM's instruction-following ability.

5. **LLM Hallucinations:** Despite RAG safeguards, LLMs can still generate inaccurate information. The system implements score thresholds and system prompt constraints, but human review is recommended for critical learning content.

6. **Career Readiness is an Estimate:** Career readiness percentages are estimates based on assessment scores and activity data. They do not guarantee employment outcomes.

7. **Small Knowledge Base:** The initial knowledge base contains sample documents. The system improves as more learning content is indexed by admins.

8. **Adaptive Engine:** The current adaptive rules are heuristic (threshold-based). A more sophisticated model (e.g., multi-armed bandit or deep RL) would improve adaptation quality.

9. **No Real-Time Collaboration:** The platform is designed for individual learning. Multi-user or collaborative features are not implemented.

10. **No Mobile App:** The platform is a web application with a responsive design. Native mobile apps are not included.

---

## 🔮 Future Enhancements

- [ ] Knowledge Graph-based prerequisite reasoning
- [ ] Collaborative filtering (recommend based on similar students)
- [ ] Deep learning-based performance prediction (LSTM for temporal patterns)
- [ ] Voice-based AI learning assistant
- [ ] Multilingual support (Hindi, Tamil, etc.)
- [ ] RAG reranking (cross-encoder reranking for better retrieval)
- [ ] LLM-based tutoring with Socratic method
- [ ] Real industry skill datasets for model training
- [ ] Mobile app (React Native)
- [ ] Peer learning features
- [ ] Gamification (badges, leaderboards)
- [ ] Integration with external course providers
- [ ] Advanced career intelligence (job market data)

---

## 📁 Project Structure

```
AI-LearnPath/
│
├── frontend/                   # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── layout/         # Sidebar, Navbar
│   │   │   ├── common/         # Shared components
│   │   │   ├── learning/       # Course, topic, path components
│   │   │   ├── assessment/     # Quiz components
│   │   │   ├── ai/             # RAG chat components
│   │   │   └── charts/         # Recharts wrappers
│   │   ├── pages/              # All page components
│   │   │   ├── public/         # Landing, Login, Register
│   │   │   ├── auth/           
│   │   │   ├── onboarding/     # Onboarding flow
│   │   │   ├── student/        # Main student pages
│   │   │   └── admin/          # Admin pages
│   │   ├── context/            # React context providers
│   │   ├── hooks/              # Custom hooks (useGreeting, useAuth)
│   │   ├── services/           # API service layer (Axios)
│   │   └── utils/              # Helper functions
│   └── vercel.json             # Vercel deployment config
│
├── backend/                    # Flask REST API
│   ├── app.py                  # Application factory
│   ├── config/                 # Settings
│   ├── models/                 # SQLAlchemy models
│   ├── routes/                 # Flask blueprints
│   ├── services/               # Business logic
│   ├── ml/                     # ML model loading bridge
│   ├── utils/                  # Auth, validators, responses
│   ├── requirements.txt
│   ├── Procfile                # Render deployment
│   └── render.yaml             # Render config
│
├── ml/                         # Machine learning pipeline
│   ├── data/                   # Synthetic training data
│   ├── preprocessing/          # Feature engineering
│   ├── random_forest/          # RF training
│   ├── kmeans/                 # K-Means training
│   ├── recommendation/         # TF-IDF recommender
│   ├── skill_gap/              # Skill gap analysis
│   ├── evaluation/             # Model evaluation
│   ├── models/                 # Saved model files (.joblib)
│   └── adaptive_engine.py      # Adaptive learning rules
│
├── rag/                        # RAG pipeline
│   ├── ingestion/              # Document loader
│   ├── chunking/               # Text chunker
│   ├── embeddings/             # Embedding providers
│   ├── vectorstore/            # ChromaDB + interface
│   ├── retrieval/              # Retriever
│   ├── prompting/              # Prompt builder
│   ├── llm/                    # LLM providers
│   ├── services/               # RAG pipeline + knowledge base
│   ├── evaluation/             # RAG evaluation
│   ├── knowledge_base/         # Sample documents
│   └── ingest_knowledge_base.py
│
├── database/
│   ├── schema.sql              # Full PostgreSQL schema
│   ├── seed.sql                # Development seed data
│   └── init_db.py              # DB initialization script
│
├── docs/                       # Documentation
│   ├── architecture.md
│   ├── database.md
│   ├── ml_models.md
│   ├── rag_pipeline.md
│   ├── api.md
│   └── deployment.md
│
├── tests/                      # Test suite
├── README.md
└── .gitignore
```

---

## 👨‍💻 Author

**Mahesh Dudi**  
MCA Final Year Project  
*AI LearnPath — AI-Based Personalized Learning Path, Skill Gap & AI Learning Assistant*

---

## 📄 License

This project is developed as an academic project. All rights reserved.

---

*AI LearnPath — Assess. Analyze. Recommend. Learn. Ask. Reassess. Adapt.*
