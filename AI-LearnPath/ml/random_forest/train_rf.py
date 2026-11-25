"""
Trains a Random Forest on SYNTHETIC data.
"""
import pandas as pd
import os
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
import joblib

def main():
    print("Training Random Forest on synthetic data...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'data', 'synthetic_students.csv')
    
    if not os.path.exists(data_path):
        print("Data not found. Run synthetic_data_generator.py first.")
        return
        
    df = pd.read_csv(data_path)
    
    # Feature columns
    subjects = ['python', 'sql', 'statistics', 'ml', 'data_viz', 
                'networking', 'linux', 'security', 'cloud', 
                'javascript', 'html_css', 'backend']
    feature_cols = [f'{sub}_score' for sub in subjects] + ['daily_study_hours', 'previous_courses_completed', 'assessment_attempts']
    
    X = df[feature_cols]
    y = df['skill_category']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    rf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    rf.fit(X_train, y_train)
    
    y_pred = rf.predict(X_test)
    
    print("=== SYNTHETIC DATA EVALUATION ===")
    print(classification_report(y_test, y_pred))
    
    models_dir = os.path.join(base_dir, 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    joblib.dump(rf, os.path.join(models_dir, 'random_forest_model.joblib'))
    with open(os.path.join(models_dir, 'rf_feature_names.json'), 'w') as f:
        json.dump(feature_cols, f)
        
    print("Model saved to ml/models/random_forest_model.joblib")

if __name__ == '__main__':
    main()
