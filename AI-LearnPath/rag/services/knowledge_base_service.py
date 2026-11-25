import os

class KnowledgeBaseService:
    def __init__(self):
        self.builtin_documents = {
            "neet_ug_physics_complete.md": {
                "topic": "Physics",
                "course": "NEET UG 2026",
                "difficulty": "All",
                "subject": "Physics"
            },
            "neet_ug_chemistry_complete.md": {
                "topic": "Chemistry",
                "course": "NEET UG 2026",
                "difficulty": "All",
                "subject": "Chemistry"
            },
            "neet_ug_biology_complete.md": {
                "topic": "Biology",
                "course": "NEET UG 2026",
                "difficulty": "All",
                "subject": "Biology"
            },
            "learning_path_guide.txt": {
                "topic": "Learning Path Guide",
                "course": "General",
                "difficulty": "All"
            },
            "faq.txt": {
                "topic": "FAQ",
                "course": "General",
                "difficulty": "All"
            },
            "skill_prerequisites.txt": {
                "topic": "Skill Prerequisites",
                "course": "General",
                "difficulty": "All"
            },
            "statistics_fundamentals.txt": {
                "topic": "Statistics",
                "course": "Data Science Fundamentals",
                "difficulty": "Beginner"
            },
            "machine_learning_basics.txt": {
                "topic": "Machine Learning",
                "course": "Data Science Fundamentals",
                "difficulty": "Intermediate"
            },
            "python_for_data_science.txt": {
                "topic": "Python",
                "course": "Data Science Fundamentals",
                "difficulty": "Beginner"
            },
            "sql_fundamentals.txt": {
                "topic": "SQL",
                "course": "Data Science Fundamentals",
                "difficulty": "Beginner"
            },
            "data_science_career_path.txt": {
                "topic": "Career Guide",
                "course": "General",
                "difficulty": "All"
            },
            "web_dev_fundamentals.txt": {
                "topic": "Web Development",
                "course": "Web Dev Bootcamp",
                "difficulty": "Beginner"
            }
        }
        
    def ingest_builtin_content(self, rag_pipeline) -> dict:
        base_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'knowledge_base', 'sample_documents')
        
        results = []
        for filename, metadata in self.builtin_documents.items():
            filepath = os.path.join(base_dir, filename)
            if os.path.exists(filepath):
                print(f"Ingesting {filename}...")
                res = rag_pipeline.ingest_document(filepath, metadata)
                results.append({
                    "file": filename,
                    "status": res['status'],
                    "chunks": res['chunk_count']
                })
                
        return {"summary": results, "total_ingested": len([r for r in results if r['status'] == 'success'])}
