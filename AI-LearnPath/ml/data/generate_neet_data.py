"""
Synthetic NEET Student Dataset Generator
----------------------------------------
Generates reproducible synthetic diagnostic and performance data for NEET (UG) 2026 students.
Strictly segregated under Rule 2: Origin is marked as SYNTHETIC.
"""

import os
import numpy as np
import pandas as pd

def generate_synthetic_neet_students(n_samples=1200, random_seed=42):
    np.random.seed(random_seed)

    # 1. Subject scores (0 to 100, bounded)
    physics_scores = np.clip(np.random.normal(56, 18, n_samples), 10, 100).round(1)
    chemistry_scores = np.clip(np.random.normal(60, 17, n_samples), 12, 100).round(1)
    biology_scores = np.clip(np.random.normal(66, 16, n_samples), 15, 100).round(1)

    # 2. Behavioral & interaction features
    daily_study_hours = np.clip(np.random.normal(4.8, 1.8, n_samples), 1.0, 12.0).round(1)
    previous_mock_attempts = np.random.poisson(lam=4, size=n_samples)
    time_per_question_sec = np.clip(np.random.normal(68, 18, n_samples), 25, 140).round(1)
    accuracy_rate = np.clip(
        (0.35 * physics_scores + 0.35 * chemistry_scores + 0.30 * biology_scores) / 100.0
        + np.random.normal(0, 0.05, n_samples),
        0.15,
        0.98
    ).round(2)

    # 3. Overall composite score
    overall_score = (0.35 * physics_scores + 0.35 * chemistry_scores + 0.30 * biology_scores).round(1)

    # 4. Deterministic label assignment for classification
    skill_categories = []
    for score in overall_score:
        if score < 50.0:
            skill_categories.append('Beginner')
        elif score < 75.0:
            skill_categories.append('Intermediate')
        else:
            skill_categories.append('Advanced')

    # 5. Behavioral cluster assignment (Persona)
    learning_personas = []
    for i in range(n_samples):
        if overall_score[i] < 52.0:
            learning_personas.append('Foundations Learner')
        elif overall_score[i] >= 75.0 and accuracy_rate[i] >= 0.75:
            learning_personas.append('Advanced Specialist')
        else:
            learning_personas.append('Skill Builder')

    df = pd.DataFrame({
        'student_id': [f'NEET_SYN_{i+1:05d}' for i in range(n_samples)],
        'data_source': ['SYNTHETIC'] * n_samples,
        'physics_score': physics_scores,
        'chemistry_score': chemistry_scores,
        'biology_score': biology_scores,
        'overall_score': overall_score,
        'accuracy_rate': accuracy_rate,
        'daily_study_hours': daily_study_hours,
        'time_per_question_sec': time_per_question_sec,
        'previous_mock_attempts': previous_mock_attempts,
        'skill_category': skill_categories,
        'learning_persona': learning_personas
    })

    return df

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_dir = os.path.join(base_dir, 'data')
    os.makedirs(output_dir, exist_ok=True)

    csv_path = os.path.join(output_dir, 'synthetic_neet_students.csv')
    df = generate_synthetic_neet_students(n_samples=1200, random_seed=42)
    df.to_csv(csv_path, index=False)

    print(f"SUCCESS: Generated {len(df)} synthetic NEET student records.")
    print(f"Saved to: {csv_path}")
    print("Class distribution:")
    print(df['skill_category'].value_counts())
    print("\nPersona distribution:")
    print(df['learning_persona'].value_counts())

if __name__ == '__main__':
    main()

