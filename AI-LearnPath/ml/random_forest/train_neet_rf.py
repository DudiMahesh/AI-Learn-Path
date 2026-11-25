"""
Trains Random Forest Classifier for NEET Student Skill Tier Prediction.
Evaluates on Synthetic NEET Data and saves model artifacts.
"""

import os
import json
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import joblib

def train_and_evaluate_rf(data_path=None, models_dir=None):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if data_path is None:
        data_path = os.path.join(base_dir, 'data', 'synthetic_neet_students.csv')
    if models_dir is None:
        models_dir = os.path.join(base_dir, 'models')
    os.makedirs(models_dir, exist_ok=True)

    if not os.path.exists(data_path):
        raise FileNotFoundError(f"NEET dataset not found at: {data_path}")

    df = pd.read_csv(data_path)

    feature_cols = [
        'physics_score',
        'chemistry_score',
        'biology_score',
        'daily_study_hours',
        'time_per_question_sec',
        'accuracy_rate',
        'previous_mock_attempts'
    ]

    X = df[feature_cols]
    y = df['skill_category']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    rf = RandomForestClassifier(
        n_estimators=120,
        max_depth=8,
        min_samples_split=4,
        random_state=42,
        class_weight='balanced'
    )
    rf.fit(X_train, y_train)

    y_pred = rf.predict(X_test)

    # Compute empirical metrics
    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred, average='macro'))
    rec = float(recall_score(y_test, y_pred, average='macro'))
    f1 = float(f1_score(y_test, y_pred, average='macro'))
    cm = confusion_matrix(y_test, y_pred, labels=['Beginner', 'Intermediate', 'Advanced']).tolist()

    report = {
        'model': 'RandomForestClassifier',
        'n_estimators': 120,
        'test_samples': len(y_test),
        'accuracy': round(acc, 4),
        'precision_macro': round(prec, 4),
        'recall_macro': round(rec, 4),
        'f1_macro': round(f1, 4),
        'confusion_matrix': cm,
        'feature_importance': {
            feat: round(float(imp), 4)
            for feat, imp in zip(feature_cols, rf.feature_importances_)
        }
    }

    # Save model artifacts
    model_path = os.path.join(models_dir, 'random_forest_model.joblib')
    features_path = os.path.join(models_dir, 'rf_feature_names.json')

    joblib.dump(rf, model_path)
    with open(features_path, 'w') as f:
        json.dump(feature_cols, f, indent=2)

    return report

def main():
    report = train_and_evaluate_rf()
    print("=== SYNTHETIC NEET RANDOM FOREST EVALUATION ===")
    print(f"Accuracy:        {report['accuracy'] * 100:.2f}%")
    print(f"Precision Macro: {report['precision_macro'] * 100:.2f}%")
    print(f"Recall Macro:    {report['recall_macro'] * 100:.2f}%")
    print(f"F1 Macro:        {report['f1_macro'] * 100:.2f}%")
    print("\nFeature Importances:")
    for feat, imp in report['feature_importance'].items():
        print(f"  {feat:<25}: {imp:.4f}")

if __name__ == '__main__':
    main()

