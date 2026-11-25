"""
Content recommender.
"""
import os
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import joblib

class ContentRecommender:
    def __init__(self, models_dir=None):
        if models_dir is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            models_dir = os.path.join(base_dir, 'models')
            
        self.vectorizer = joblib.load(os.path.join(models_dir, 'tfidf_vectorizer.joblib'))
        self.matrix = np.load(os.path.join(models_dir, 'tfidf_matrix.npy'))
        
        with open(os.path.join(models_dir, 'course_metadata.json'), 'r') as f:
            self.metadata = json.load(f)
            
        # Keep an ordered list of IDs corresponding to matrix rows
        self.course_ids = list(self.metadata.keys())

    def build_query_from_gaps(self, skill_gaps: list, career: str, current_skills: dict = None) -> str:
        query_parts = [career]
        for gap in skill_gaps:
            query_parts.append(gap['skill'])
        return " ".join(query_parts)

    def recommend(self, query: str, skill_gaps: list, career: str, top_k=10) -> list:
        query_vec = self.vectorizer.transform([query]).toarray()
        similarities = cosine_similarity(query_vec, self.matrix)[0]
        
        gap_skills = {g['skill']: g for g in skill_gaps}
        
        scored_courses = []
        for idx, sim in enumerate(similarities):
            c_id = self.course_ids[idx]
            course = self.metadata[c_id]
            
            # Boost score if it matches a gap
            boost = 0.0
            if course['skill'] in gap_skills:
                gap_info = gap_skills[course['skill']]
                boost += 0.2 * gap_info['importance']
                
            # Boost score for career match
            if course['career'] == career:
                boost += 0.1
                
            final_score = sim + boost
            if final_score > 0:
                scored_courses.append({
                    'course_id': course['id'],
                    'title': course['title'],
                    'score': float(final_score),
                    'reason': f"Matches career {career} and skill gap" if course['skill'] in gap_skills else "Matches interests",
                    'skill_addressed': course['skill']
                })
                
        scored_courses = sorted(scored_courses, key=lambda x: x['score'], reverse=True)
        return scored_courses[:top_k]
