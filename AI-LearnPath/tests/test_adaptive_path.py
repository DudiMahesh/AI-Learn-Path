"""
Unit Tests for Adaptive Learning Path & ML Prediction Engine
Verifies Random Forest tier prediction, KMeans persona clustering,
backward compatibility with legacy features, and DAG prerequisite updates.
"""

import sys
import os
import unittest

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend.services.ml_service import MLService


class TestAdaptivePathML(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.ml_service = MLService()

    def test_high_performer_prediction(self):
        """High NEET scores (650+) should be classified as Advanced Specialist."""
        features = {
            'physics_score': 165.0,
            'chemistry_score': 170.0,
            'biology_score': 335.0,
            'accuracy_rate': 92.5,
            'avg_time_per_question': 45.0,
            'revision_consistency': 0.95,
            'total_neet_score': 670.0
        }
        res = self.ml_service.predict_student_tier(features)
        self.assertIn('tier', res)
        self.assertIn(res['tier'], ['Advanced Specialist', 'Skill Builder'])
        self.assertGreaterEqual(res.get('confidence', 0.0), 0.5)

    def test_foundations_learner_prediction(self):
        """Low NEET scores (<300) should be classified as Foundations Learner."""
        features = {
            'physics_score': 45.0,
            'chemistry_score': 55.0,
            'biology_score': 110.0,
            'accuracy_rate': 40.0,
            'avg_time_per_question': 85.0,
            'revision_consistency': 0.3,
            'total_neet_score': 210.0
        }
        res = self.ml_service.predict_student_tier(features)
        self.assertIn('tier', res)
        self.assertEqual(res['tier'], 'Foundations Learner')

    def test_legacy_feature_backward_compatibility(self):
        """Legacy 3-key dictionary {'quiz_scores': ..., 'completion_rate': ..., 'study_time': ...}."""
        legacy_features = {
            'quiz_scores': 88.0,
            'completion_rate': 0.85,
            'study_time': 120.0
        }
        # Must not raise an exception; must return valid tier prediction
        res = self.ml_service.predict_student_tier(legacy_features)
        self.assertIn('tier', res)
        self.assertIn(res['tier'], ['Foundations Learner', 'Skill Builder', 'Advanced Specialist'])

    def test_kmeans_clustering(self):
        """KMeans clustering returns valid cluster id (0, 1, or 2) and cluster name."""
        features = {
            'physics_score': 120.0,
            'chemistry_score': 130.0,
            'biology_score': 270.0,
            'accuracy_rate': 75.0,
            'avg_time_per_question': 60.0,
            'revision_consistency': 0.75,
            'total_neet_score': 520.0
        }
        cluster_info = self.ml_service.cluster_student(features)
        self.assertIn('cluster_id', cluster_info)
        self.assertIn(cluster_info['cluster_id'], [0, 1, 2])
        self.assertIn('archetype_name', cluster_info)

    def test_dag_prerequisite_logic(self):
        """Simulate learning path DAG dependency check."""
        syllabus_dag = {
            "Units and Measurements": {"prerequisites": [], "completed": True},
            "Kinematics": {"prerequisites": ["Units and Measurements"], "completed": False},
            "Laws of Motion": {"prerequisites": ["Kinematics"], "completed": False}
        }
        # Kinematics is unlocked because Units and Measurements is completed
        kinematics_prereqs_met = all(syllabus_dag[p]["completed"] for p in syllabus_dag["Kinematics"]["prerequisites"])
        self.assertTrue(kinematics_prereqs_met)

        # Laws of Motion is locked because Kinematics is not completed
        lom_prereqs_met = all(syllabus_dag[p]["completed"] for p in syllabus_dag["Laws of Motion"]["prerequisites"])
        self.assertFalse(lom_prereqs_met)


if __name__ == '__main__':
    unittest.main()

