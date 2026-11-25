import joblib
import os

rf_model = None
kmeans_model = None
tfidf_vectorizer = None
tfidf_matrix = None
course_metadata = None

def load_models():
    global rf_model, kmeans_model, tfidf_vectorizer, tfidf_matrix, course_metadata
    base_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        rf_model = joblib.load(os.path.join(base_dir, 'models', 'rf_model.pkl'))
        kmeans_model = joblib.load(os.path.join(base_dir, 'models', 'kmeans_model.pkl'))
        tfidf_vectorizer = joblib.load(os.path.join(base_dir, 'models', 'tfidf_vectorizer.pkl'))
        tfidf_matrix = joblib.load(os.path.join(base_dir, 'models', 'tfidf_matrix.pkl'))
        course_metadata = joblib.load(os.path.join(base_dir, 'models', 'course_metadata.pkl'))
    except FileNotFoundError:
        pass # models will be none, handled by services gracefully

load_models()
