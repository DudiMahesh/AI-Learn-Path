import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

import joblib, json, numpy as np

# Load models at module level (once at startup)
ML_MODELS_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'ml', 'models')

def _load_model(filename):
    path = os.path.join(ML_MODELS_PATH, filename)
    if os.path.exists(path):
        return joblib.load(path)
    return None

_rf_model = _load_model('random_forest_model.joblib')
_kmeans_model = _load_model('kmeans_model.joblib')
_kmeans_scaler = _load_model('kmeans_scaler.joblib')
_tfidf_vectorizer = _load_model('tfidf_vectorizer.joblib')
_tfidf_matrix = np.load(os.path.join(ML_MODELS_PATH, 'tfidf_matrix.npy')) if os.path.exists(os.path.join(ML_MODELS_PATH, 'tfidf_matrix.npy')) else None

_cluster_labels = {}
cluster_labels_path = os.path.join(ML_MODELS_PATH, 'cluster_labels.json')
if os.path.exists(cluster_labels_path):
    with open(cluster_labels_path) as f:
        _cluster_labels = json.load(f)

_course_metadata = []
course_meta_path = os.path.join(ML_MODELS_PATH, 'course_metadata.json')
if os.path.exists(course_meta_path):
    with open(course_meta_path) as f:
        _course_metadata = json.load(f)

_rf_feature_names = []
rf_features_path = os.path.join(ML_MODELS_PATH, 'rf_feature_names.json')
if os.path.exists(rf_features_path):
    with open(rf_features_path) as f:
        _rf_feature_names = json.load(f)


def predict_skill_level(features: dict) -> dict:
    if _rf_model is None:
        return {'level': 'Intermediate', 'confidence': 0.8, 'note': 'Model not loaded'}
    
    try:
        # Normalize and alias inputs
        phy = float(features.get('physics_score', features.get('quiz_scores', 60.0)))
        chem = float(features.get('chemistry_score', features.get('quiz_scores', 60.0)))
        bio = float(features.get('biology_score', features.get('quiz_scores', 65.0)))
        
        # Scale if NEET 720 marks passed
        if phy > 100.0: phy = min(100.0, (phy / 180.0) * 100.0)
        if chem > 100.0: chem = min(100.0, (chem / 180.0) * 100.0)
        if bio > 100.0: bio = min(100.0, (bio / 360.0) * 100.0)
        
        study_hours = float(features.get('daily_study_hours', features.get('study_time', 4.0)))
        if study_hours > 24.0: study_hours = study_hours / 60.0  # minutes to hours
        
        time_sec = float(features.get('time_per_question_sec', features.get('avg_time_per_question', 60.0)))
        
        acc = float(features.get('accuracy_rate', features.get('completion_rate', 0.70)))
        if acc > 1.0: acc = acc / 100.0
        
        mocks = int(features.get('previous_mock_attempts', 3))
        
        feature_dict = {
            'physics_score': phy,
            'chemistry_score': chem,
            'biology_score': bio,
            'daily_study_hours': study_hours,
            'time_per_question_sec': time_sec,
            'accuracy_rate': acc,
            'previous_mock_attempts': mocks
        }
        
        feature_vector = [feature_dict.get(fname, 0.0) for fname in _rf_feature_names]
        
        import pandas as pd
        X = pd.DataFrame([feature_vector], columns=_rf_feature_names)
        prediction = _rf_model.predict(X)[0]
        proba = _rf_model.predict_proba(X)[0]
        confidence = float(max(proba))
        return {'level': str(prediction), 'confidence': confidence}
    except Exception as e:
        print(f"Skill level prediction fallback: {e}")
        return {'level': 'Intermediate', 'confidence': 0.75}


class MLService:
    @staticmethod
    def predict_student_tier(features: dict) -> dict:
        res = predict_skill_level(features)
        raw_level = res.get('level', 'Intermediate')
        tier_map = {
            'Beginner': 'Foundations Learner',
            'Intermediate': 'Skill Builder',
            'Advanced': 'Advanced Specialist',
            'beginner': 'Foundations Learner',
            'intermediate': 'Skill Builder',
            'advanced': 'Advanced Specialist',
        }
        mapped_tier = tier_map.get(raw_level, raw_level)
        return {
            'tier': mapped_tier,
            'raw_level': raw_level,
            'confidence': res.get('confidence', 0.75)
        }

    @staticmethod
    def cluster_student(features: dict) -> dict:
        res = get_learning_profile(features)
        return {
            'cluster_id': res.get('cluster_id', 0),
            'archetype_name': res.get('label', 'Skill Builder'),
            'description': res.get('description', '')
        }

    @staticmethod
    def get_recommendations(skill_gaps: list, career_name: str, top_k: int = 10) -> list:
        return get_recommendations(skill_gaps, career_name, top_k=top_k)


def get_learning_profile(features: dict) -> dict:
    if _kmeans_model is None or _kmeans_scaler is None:
        return {'cluster_id': 0, 'label': 'Skill Builder', 'description': 'Build your foundation step by step.'}
    
    try:
        feature_values = list(features.values())
        if hasattr(_kmeans_scaler, 'n_features_in_') and len(feature_values) != _kmeans_scaler.n_features_in_:
            # Pad or slice to match expected number of features
            needed = _kmeans_scaler.n_features_in_
            if len(feature_values) < needed:
                feature_values.extend([0.0] * (needed - len(feature_values)))
            else:
                feature_values = feature_values[:needed]

        X = _kmeans_scaler.transform([feature_values])
        cluster_id = int(_kmeans_model.predict(X)[0])
        label = _cluster_labels.get(str(cluster_id), {}).get('label', 'Skill Builder')
        description = _cluster_labels.get(str(cluster_id), {}).get('description', 'Personalized adaptive learning path.')
        return {'cluster_id': cluster_id, 'label': label, 'description': description}
    except Exception as e:
        print(f"Learning profile fallback: {e}")
        return {'cluster_id': 0, 'label': 'Skill Builder', 'description': 'Personalized curriculum constructed for your career path.'}



def get_recommendations(skill_gaps: list, career_name: str, top_k: int = 10) -> list:
    if _tfidf_vectorizer is None or _tfidf_matrix is None or not _course_metadata:
        return []
    
    from sklearn.metrics.pairwise import cosine_similarity
    
    gap_terms = ' '.join([g['skill'] for g in skill_gaps[:5]])
    query = f"{career_name} {gap_terms}"
    
    query_vec = _tfidf_vectorizer.transform([query])
    similarities = cosine_similarity(query_vec, _tfidf_matrix)[0]
    
    top_indices = similarities.argsort()[-top_k:][::-1]
    
    recommendations = []
    for idx in top_indices:
        if idx < len(_course_metadata):
            course = _course_metadata[idx]
            score = float(similarities[idx])
            if score > 0.05:
                recommendations.append({
                    'course_id': course.get('id'),
                    'title': course.get('title'),
                    'score': round(score, 4),
                    'skill': course.get('skill'),
                    'career': course.get('career'),
                    'difficulty': course.get('difficulty'),
                    'reason': f"Recommended based on your skill gaps in {gap_terms or career_name}"
                })
    
    return recommendations


def run_full_ml_pipeline(user_id: int, skill_scores: dict) -> dict:
    from models import db
    from models.analytics import ModelPrediction, ClusterAssignment
    
    # Supports both NEET medical entrance subjects and legacy features seamlessly
    phy = float(skill_scores.get('Physics', skill_scores.get('physics_score', 60.0)))
    chem = float(skill_scores.get('Chemistry', skill_scores.get('chemistry_score', 60.0)))
    bio = float(skill_scores.get('Biology', skill_scores.get('biology_score', 65.0)))

    rf_features = {
        'physics_score': phy,
        'chemistry_score': chem,
        'biology_score': bio,
        'daily_study_hours': 4.0,
        'time_per_question_sec': 65.0,
        'accuracy_rate': round((phy + chem + bio) / 300.0, 2),
        'previous_mock_attempts': 1,
        # Legacy fallback keys for backward compatibility
        'python_score': skill_scores.get('Python', 0),
        'sql_score': skill_scores.get('SQL', 0),
        'statistics_score': skill_scores.get('Statistics', 0),
        'machine_learning_score': skill_scores.get('Machine Learning', 0),
        'data_analysis_score': skill_scores.get('Data Analysis', 0),
        'javascript_score': skill_scores.get('JavaScript', 0),
        'html_css_score': skill_scores.get('HTML & CSS', 0),
        'networking_score': skill_scores.get('Networking Fundamentals', 0),
        'security_score': skill_scores.get('Security Fundamentals', 0),
        'cloud_score': skill_scores.get('Cloud Basics', 0),
        'previous_courses_completed': 0,
        'assessment_attempts': 1
    }
    
    level_result = predict_skill_level(rf_features)
    
    avg_score = sum(skill_scores.values()) / len(skill_scores) if skill_scores else 0
    kmeans_features = {
        'avg_score': avg_score,
        'max_score': max(skill_scores.values()) if skill_scores else 0,
        'min_score': min(skill_scores.values()) if skill_scores else 0,
        'study_time': 2.0,
        'completion_rate': 0.0
    }
    profile_result = get_learning_profile(kmeans_features)
    
    try:
        pred = ModelPrediction(
            user_id=user_id,
            prediction_data={'level': level_result['level'], 'confidence': level_result.get('confidence', 0), 'input': rf_features}
        )
        db.session.add(pred)
        
        cluster = ClusterAssignment(
            user_id=user_id,
            cluster_id=profile_result['cluster_id']
        )
        db.session.add(cluster)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error saving ML predictions: {e}")
    
    return {
        'level': level_result['level'],
        'confidence': level_result.get('confidence', 0),
        'profile': profile_result,
        'skill_scores': skill_scores
    }
