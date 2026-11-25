"""
Build TF-IDF recommendation index from course/topic data.
"""
import os
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

def get_hardcoded_catalog():
    return [
        {"id": 1, "title": "Python Fundamentals", "skill": "python", "career": "Data Science", "difficulty": "beginner", "description": "Learn python programming basics functions.", "tags": "python programming basics functions"},
        {"id": 2, "title": "Python for Data Analysis", "skill": "python", "career": "Data Science", "difficulty": "intermediate", "description": "Data manipulation with python pandas numpy.", "tags": "python pandas numpy data manipulation"},
        {"id": 3, "title": "SQL Fundamentals", "skill": "sql", "career": "Data Science", "difficulty": "beginner", "description": "Database queries joins aggregation.", "tags": "sql database queries joins aggregation"},
        {"id": 4, "title": "Statistics Fundamentals", "skill": "statistics", "career": "Data Science", "difficulty": "beginner", "description": "Basics of statistics probability mean variance distributions.", "tags": "statistics probability mean variance distributions"},
        {"id": 5, "title": "Advanced Statistics", "skill": "statistics", "career": "Data Science", "difficulty": "advanced", "description": "Advanced hypothesis testing regression statistical inference.", "tags": "hypothesis testing regression statistical inference"},
        {"id": 6, "title": "Data Visualization", "skill": "data_viz", "career": "Data Science", "difficulty": "intermediate", "description": "Create charts with matplotlib seaborn visualization.", "tags": "matplotlib seaborn visualization charts"},
        {"id": 7, "title": "Machine Learning Basics", "skill": "ml", "career": "Data Science", "difficulty": "intermediate", "description": "Introduction to machine learning supervised unsupervised algorithms.", "tags": "machine learning supervised unsupervised algorithms"},
        {"id": 8, "title": "Advanced Machine Learning", "skill": "ml", "career": "Data Science", "difficulty": "advanced", "description": "Deep learning neural networks ensemble methods.", "tags": "neural networks deep learning ensemble methods"},
        {"id": 9, "title": "Data Science Capstone", "skill": "ml", "career": "Data Science", "difficulty": "advanced", "description": "Complete project data science end-to-end pipeline.", "tags": "project data science end-to-end pipeline"},
        {"id": 10, "title": "Web Development Bootcamp", "skill": "html_css", "career": "Web Developer", "difficulty": "beginner", "description": "HTML CSS frontend.", "tags": "html css frontend web"},
        {"id": 11, "title": "Advanced JavaScript", "skill": "javascript", "career": "Web Developer", "difficulty": "advanced", "description": "ES6 async programming.", "tags": "javascript es6 async frontend"},
        {"id": 12, "title": "Cybersecurity Basics", "skill": "security", "career": "Cybersecurity", "difficulty": "beginner", "description": "Introduction to security concepts.", "tags": "security cyber networking threats"}
    ]

def main():
    print("Building TF-IDF recommendation index...")
    catalog = get_hardcoded_catalog()
    
    documents = []
    metadata = {}
    for course in catalog:
        doc = f"{course['title']} {course['description']} {course['tags']} {course['skill']} {course['career']}"
        documents.append(doc)
        metadata[str(course['id'])] = {
            "id": course['id'],
            "title": course['title'],
            "skill": course['skill'],
            "career": course['career'],
            "difficulty": course['difficulty']
        }
        
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)
    
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    models_dir = os.path.join(base_dir, 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    joblib.dump(vectorizer, os.path.join(models_dir, 'tfidf_vectorizer.joblib'))
    np.save(os.path.join(models_dir, 'tfidf_matrix.npy'), tfidf_matrix.toarray())
    
    with open(os.path.join(models_dir, 'course_metadata.json'), 'w') as f:
        json.dump(metadata, f)
        
    print("TF-IDF Index saved to ml/models/")

if __name__ == '__main__':
    main()
