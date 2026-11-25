"""
SYNTHETIC DATA GENERATOR
This script generates purely synthetic student assessment data for training ML models.
DO NOT use as real educational data.
"""
import pandas as pd
import numpy as np
import os

def generate_data(num_students=1200):
    np.random.seed(42)
    
    # Base profiles for 'beginner', 'intermediate', 'advanced'
    categories = ['beginner', 'intermediate', 'advanced']
    data = []
    
    for _ in range(num_students):
        cat = np.random.choice(categories, p=[0.4, 0.4, 0.2])
        
        if cat == 'beginner':
            base_score = np.random.normal(40, 10)
            hours = np.random.normal(1.5, 0.5)
            completed = np.random.randint(0, 3)
            attempts = np.random.randint(1, 4)
        elif cat == 'intermediate':
            base_score = np.random.normal(65, 10)
            hours = np.random.normal(3.0, 1.0)
            completed = np.random.randint(2, 6)
            attempts = np.random.randint(1, 3)
        else: # advanced
            base_score = np.random.normal(85, 8)
            hours = np.random.normal(4.5, 1.5)
            completed = np.random.randint(5, 12)
            attempts = 1
            
        # Ensure bounds
        base_score = np.clip(base_score, 0, 100)
        hours = np.clip(hours, 0.1, 8.0)
        
        # Generate specific subject scores around base
        subjects = ['python', 'sql', 'statistics', 'ml', 'data_viz', 
                    'networking', 'linux', 'security', 'cloud', 
                    'javascript', 'html_css', 'backend']
        
        row = {
            'daily_study_hours': hours,
            'previous_courses_completed': completed,
            'assessment_attempts': attempts,
            'skill_category': cat
        }
        
        for sub in subjects:
            score = np.random.normal(base_score, 12)
            row[f'{sub}_score'] = np.clip(score, 0, 100)
            
        data.append(row)
        
    df = pd.DataFrame(data)
    
    # Save
    out_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(out_dir, exist_ok=True)
    df.to_csv(os.path.join(out_dir, 'synthetic_students.csv'), index=False)
    print(f"Generated {len(df)} synthetic records at ml/data/synthetic_students.csv")

if __name__ == '__main__':
    generate_data()
