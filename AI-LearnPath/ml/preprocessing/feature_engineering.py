"""
Feature engineering for ML pipeline.
"""
import numpy as np

class FeatureEngineer:
    def extract_assessment_features(self, assessment_scores: dict, study_time: float, attempts: int) -> np.ndarray:
        scores = list(assessment_scores.values())
        return np.array(scores + [study_time, attempts])

    def normalize_scores(self, scores: dict) -> dict:
        return {k: max(0, min(100, float(v))) for k, v in scores.items()}

    def prepare_rf_features(self, user_data: dict) -> np.ndarray:
        subjects = ['python', 'sql', 'statistics', 'ml', 'data_viz', 
                    'networking', 'linux', 'security', 'cloud', 
                    'javascript', 'html_css', 'backend']
        
        features = []
        for sub in subjects:
            features.append(user_data.get(f'{sub}_score', 0))
            
        features.append(user_data.get('daily_study_hours', 0))
        features.append(user_data.get('previous_courses_completed', 0))
        features.append(user_data.get('assessment_attempts', 1))
        
        return np.array(features).reshape(1, -1)

    def prepare_kmeans_features(self, user_data: dict) -> np.ndarray:
        return self.prepare_rf_features(user_data)
