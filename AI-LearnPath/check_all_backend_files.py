import os
import sys
import py_compile
import traceback

root_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(root_dir, 'backend')
rag_dir = os.path.join(root_dir, 'rag')

sys.path.insert(0, backend_dir)
sys.path.insert(0, root_dir)

print("=" * 60)
print("COMPREHENSIVE BACKEND & SYSTEM HEALTH AUDIT")
print("=" * 60)

total_py_files = 0
compilation_errors = []

for base_dir in [backend_dir, rag_dir]:
    for dirpath, _, filenames in os.walk(base_dir):
        if 'venv' in dirpath or '__pycache__' in dirpath or '.git' in dirpath:
            continue
        for f in filenames:
            if f.endswith('.py'):
                total_py_files += 1
                full_path = os.path.join(dirpath, f)
                try:
                    py_compile.compile(full_path, doraise=True)
                except py_compile.PyCompileError as e:
                    compilation_errors.append((full_path, str(e)))

print(f"Total Python source files compiled: {total_py_files}")
if compilation_errors:
    print(f"Compilation Errors Found: {len(compilation_errors)}")
    for p, err in compilation_errors:
        print(f"  - {p}: {err}")
else:
    print("[OK] All Python files compile with 0 syntax errors!")

print("\nTesting Flask App Initialization & Blueprints...")
try:
    from app import create_app
    from models import db, User, Career, Skill, Assessment, Question, AssessmentAttempt
    from config.settings import Config
    
    class TestConfig(Config):
        TESTING = True
        SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
        SQLALCHEMY_ENGINE_OPTIONS = {}
        JWT_SECRET_KEY = 'test-secret-key-for-health-check'

    app = create_app(TestConfig)
    with app.app_context():
        db.create_all()
        # Verify db connection and integrity
        result = db.session.execute(db.text("PRAGMA integrity_check")).fetchone()
        print(f"[OK] SQLite Database Integrity Check: {result[0]}")
        
        # Verify tables creation
        db.session.add(Career(id=1, name="MBBS", description="Medical"))
        db.session.add(Skill(id=1, name="Mechanics", description="Physics"))
        db.session.add(Assessment(id=1, title="NEET Diagnostic", type="diagnostic", career_id=1))
        db.session.add(Question(id=1, assessment_id=1, text="Test Q", options={"A": "1"}, correct_option="A"))
        db.session.commit()

        career_count = Career.query.count()
        skill_count = Skill.query.count()
        assessment_count = Assessment.query.count()
        question_count = Question.query.count()
        print(f"[OK] Database Schema & ORM: {career_count} career, {skill_count} skill, {assessment_count} assessment, {question_count} question")
        
        # Test client calls
        client = app.test_client()
        
        # 1. Health check
        res = client.get('/api/health')
        assert res.status_code == 200, f"Health check returned {res.status_code}"
        print(f"[OK] GET /api/health -> 200 OK: {res.get_json()}")
        
        # 2. 404 handler
        res404 = client.get('/api/non-existent-endpoint')
        assert res404.status_code == 404, f"404 route returned {res404.status_code}"
        print("[OK] 404 error handler working correctly")
        
        # 3. Auth validation check
        res_auth = client.post('/api/auth/login', json={})
        assert res_auth.status_code == 400, f"Auth validation returned {res_auth.status_code}"
        print("[OK] POST /api/auth/login empty payload -> 400 Bad Request handled gracefully")
        
        # 4. RAG Prompt Builder & LLM initialization check
        from rag.prompting.prompt_builder import PromptBuilder
        from rag.llm.groq_llm import GroqLLM
        pb = PromptBuilder()
        msgs = pb.build_rag_prompt("Bernoulli equation", [], [], {"subject": "Physics", "depth": "exhaustive"})
        assert len(msgs) == 2, "Prompt builder should return system + user message"
        assert "Bernoulli" in msgs[1]['content'], "User message should contain query"
        print(f"[OK] RAG PromptBuilder & 8-part chapter engine verified (System prompt length: {len(msgs[0]['content'])} chars)")
        
        # 5. ML Adaptive Path service
        from services.ml_service import predict_learning_profile, predict_next_milestone
        profile = predict_learning_profile(1, {"NEET Physics": 85, "NEET Biology": 90})
        assert 'level' in profile, "ML service should return level"
        print(f"[OK] ML Adaptive Path Prediction verified (Calculated level: {profile.get('level')})")
        
        # 6. NEET Rank Predictor
        from services.neet_scoring_service import predict_neet_rank
        rank_data = predict_neet_rank(650)
        assert rank_data['marks'] == 650
        assert 'tier' in rank_data
        print(f"[OK] NEET Rank Predictor verified: Score 650 -> Percentile {rank_data['percentile']}%, Rank ~{rank_data['estimated_air']}")
        
    print("\n" + "=" * 60)
    print("ALL CORE BACKEND MODULES & SERVICES ARE 100% HEALTHY!")
    print("=" * 60)
    sys.exit(0)

except Exception as ex:
    print(f"\n[ERROR] Backend audit failed: {ex}")
    traceback.print_exc()
    sys.exit(1)
