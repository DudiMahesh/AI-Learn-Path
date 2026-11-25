"""
Trains K-Means clustering model on SYNTHETIC data.
"""
import pandas as pd
import numpy as np
import os
import json
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import joblib

def main():
    print("Training KMeans on synthetic data...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'data', 'synthetic_students.csv')
    
    if not os.path.exists(data_path):
        print("Data not found.")
        return
        
    df = pd.read_csv(data_path)
    
    subjects = ['python', 'sql', 'statistics', 'ml', 'data_viz', 
                'networking', 'linux', 'security', 'cloud', 
                'javascript', 'html_css', 'backend']
    feature_cols = [f'{sub}_score' for sub in subjects] + ['daily_study_hours', 'previous_courses_completed']
    
    X = df[feature_cols]
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # K-means with k=3
    kmeans = KMeans(n_clusters=3, random_state=42)
    clusters = kmeans.fit_predict(X_scaled)
    
    score = silhouette_score(X_scaled, clusters)
    print(f"Silhouette Score: {score:.3f}")
    
    # Analyze centroids to assign names
    centroids = scaler.inverse_transform(kmeans.cluster_centers_)
    
    # Compute average score across subjects for each centroid
    subject_indices = [feature_cols.index(f'{sub}_score') for sub in subjects]
    avg_scores = [np.mean(centroid[subject_indices]) for centroid in centroids]
    
    # Sort centroids by average score to map labels properly
    sorted_idx = np.argsort(avg_scores)
    
    label_map = {
        int(sorted_idx[0]): 'Foundation Learner',
        int(sorted_idx[1]): 'Skill Builder',
        int(sorted_idx[2]): 'Advanced Learner'
    }
    
    print("Cluster mappings:", label_map)
    
    models_dir = os.path.join(base_dir, 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    joblib.dump(kmeans, os.path.join(models_dir, 'kmeans_model.joblib'))
    joblib.dump(scaler, os.path.join(models_dir, 'kmeans_scaler.joblib'))
    
    with open(os.path.join(models_dir, 'cluster_labels.json'), 'w') as f:
        json.dump(label_map, f)
        
    print("KMeans model saved.")

if __name__ == '__main__':
    main()
