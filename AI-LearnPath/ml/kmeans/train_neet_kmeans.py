"""
Trains K-Means Clustering for NEET Learning Persona Segmentation.
Evaluates Silhouette Score, Davies-Bouldin Index, and Centroids.
"""

import os
import json
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, davies_bouldin_score
import joblib

def train_and_evaluate_kmeans(data_path=None, models_dir=None):
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
        'accuracy_rate'
    ]

    X = df[feature_cols]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # 3 personas: Foundations Learner, Skill Builder, Advanced Specialist
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=15)
    clusters = kmeans.fit_predict(X_scaled)

    sil_score = float(silhouette_score(X_scaled, clusters))
    db_index = float(davies_bouldin_score(X_scaled, clusters))
    inertia = float(kmeans.inertia_)

    # Map cluster centroids to meaningful pedagogical personas
    centroids_orig = scaler.inverse_transform(kmeans.cluster_centers_)
    avg_scores = [np.mean(c[:3]) for c in centroids_orig]
    sorted_indices = np.argsort(avg_scores)

    persona_map = {
        int(sorted_indices[0]): {
            'label': 'Foundations Learner',
            'description': 'Prioritizes core NCERT concept grounding and prerequisite reinforcement.'
        },
        int(sorted_indices[1]): {
            'label': 'Skill Builder',
            'description': 'Balanced practice with targeted question drills and speed calibration.'
        },
        int(sorted_indices[2]): {
            'label': 'Advanced Specialist',
            'description': 'High-yield rank boosting with tricky mock assessments and timing optimization.'
        }
    }

    # Distribution count
    counts = {persona_map[cid]['label']: int(np.sum(clusters == cid)) for cid in range(3)}

    report = {
        'model': 'KMeansClustering',
        'n_clusters': 3,
        'samples': len(df),
        'silhouette_score': round(sil_score, 4),
        'davies_bouldin_index': round(db_index, 4),
        'inertia': round(inertia, 2),
        'cluster_distribution': counts,
        'persona_mapping': {str(k): v for k, v in persona_map.items()}
    }

    # Save artifacts
    joblib.dump(kmeans, os.path.join(models_dir, 'kmeans_model.joblib'))
    joblib.dump(scaler, os.path.join(models_dir, 'kmeans_scaler.joblib'))
    with open(os.path.join(models_dir, 'cluster_labels.json'), 'w') as f:
        json.dump(persona_map, f, indent=2)

    return report

def main():
    report = train_and_evaluate_kmeans()
    print("=== SYNTHETIC NEET K-MEANS EVALUATION ===")
    print(f"Silhouette Score:      {report['silhouette_score']:.4f}")
    print(f"Davies-Bouldin Index:  {report['davies_bouldin_index']:.4f}")
    print(f"Inertia:               {report['inertia']:.2f}")
    print("\nCluster Distribution:")
    for label, count in report['cluster_distribution'].items():
        print(f"  {label:<25}: {count} students")

if __name__ == '__main__':
    main()

