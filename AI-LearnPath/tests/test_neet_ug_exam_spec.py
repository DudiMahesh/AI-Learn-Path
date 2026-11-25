"""
Unit Tests for NEET (UG) Official Exam Specification:
- Exam Duration: 3 hours 20 minutes (200 minutes)
- Total Questions to be Attempted: 180 questions (out of 200 total)
- Subjects: Physics, Chemistry, Botany & Zoology (45 questions attempted each)
- Total Marks: 720 Marks (+4 for correct, -1 for incorrect, 0 for unattempted)
"""

import unittest
import sys
import os

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_dir = os.path.join(root_dir, 'backend')
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from backend.services.scoring_engine import calculate_neet_score

class TestNEETUGExamSpecification(unittest.TestCase):
    def test_official_duration_and_marks(self):
        """Verifies duration is 200 minutes (3h 20m) and max marks is 720 for full 4-subject exam."""
        # Create full 200-question response list (50 Physics, 50 Chemistry, 50 Botany, 50 Zoology)
        responses = []
        for sub in ['Physics', 'Chemistry', 'Botany', 'Zoology']:
            for q_idx in range(50):
                section = 'A' if q_idx < 35 else 'B'
                responses.append({
                    'id': f'{sub}_{q_idx+1}',
                    'subject': sub,
                    'section': section,
                    'selected': 'A' if q_idx < 45 else None,  # Attempt 35 in Sec A + 10 in Sec B = 45 attempted
                    'correct': 'A'
                })

        self.assertEqual(len(responses), 200, "Full exam must have exactly 200 questions")

        result = calculate_neet_score(responses, mode="nta_pattern")
        
        self.assertEqual(result["exam_duration_minutes"], 200, "NEET-UG exam duration must be 200 minutes (3h 20m)")
        self.assertEqual(result["questions_attempted"], 180, "Candidate must attempt exactly 180 questions (45 per subject)")
        self.assertEqual(result["max_possible_score"], 720, "Total marks for NEET-UG must be exactly 720")
        self.assertEqual(result["raw_score"], 720, "180 correct answers must yield exactly 720 marks (180 * 4)")
        self.assertEqual(result["percentage"], 100.0, "Perfect score should be 100%")

    def test_section_b_cap_per_subject(self):
        """Verifies Section B only evaluates first 10 attempted questions out of 15."""
        responses = []
        for sub in ['Physics', 'Chemistry', 'Botany', 'Zoology']:
            # 35 Sec A questions: all correct
            for i in range(35):
                responses.append({'id': f'{sub}_A_{i}', 'subject': sub, 'section': 'A', 'selected': 'B', 'correct': 'B'})
            # 15 Sec B questions: candidate attempts ALL 15 (first 10 correct, last 5 wrong)
            for i in range(15):
                selected = 'B' if i < 10 else 'C'
                responses.append({'id': f'{sub}_B_{i}', 'subject': sub, 'section': 'B', 'selected': selected, 'correct': 'B'})

        result = calculate_neet_score(responses, mode="nta_pattern")
        # Per NTA: each subject evaluates 35 + 10 = 45 questions. Total evaluated = 180.
        # The extra 5 attempts in Section B are ignored.
        self.assertEqual(result["correct_answers"], 180)
        self.assertEqual(result["incorrect_answers"], 0, "Attempts beyond 10 in Section B must not penalize candidate")
        self.assertEqual(result["raw_score"], 720)

    def test_negative_marking_penalty(self):
        """Verifies +4 for correct, -1 for incorrect, and 0 for unattempted."""
        responses = []
        # 100 correct (+400), 40 incorrect (-40), 40 unattempted (0) = 180 attempted out of 200
        for i in range(100):
            responses.append({'id': f'q_{i}', 'subject': 'Physics', 'section': 'A', 'selected': 'A', 'correct': 'A'})
        for i in range(40):
            responses.append({'id': f'q_w_{i}', 'subject': 'Chemistry', 'section': 'A', 'selected': 'B', 'correct': 'A'})
        for i in range(60):
            responses.append({'id': f'q_u_{i}', 'subject': 'Botany', 'section': 'B', 'selected': None, 'correct': 'A'})

        result = calculate_neet_score(responses, mode="nta_pattern")
        expected_score = (100 * 4) - (40 * 1)  # 400 - 40 = 360
        self.assertEqual(result["raw_score"], expected_score)
        self.assertEqual(result["max_possible_score"], 720)

    def test_four_core_subjects(self):
        """Verifies the four official NEET subjects: Physics, Chemistry, Botany, and Zoology."""
        expected_subjects = {'Physics', 'Chemistry', 'Botany', 'Zoology'}
        responses = [
            {'id': 'p1', 'subject': 'Physics', 'selected': 'A', 'correct': 'A'},
            {'id': 'c1', 'subject': 'Chemistry', 'selected': 'A', 'correct': 'A'},
            {'id': 'b1', 'subject': 'Botany', 'selected': 'A', 'correct': 'A'},
            {'id': 'z1', 'subject': 'Zoology', 'selected': 'A', 'correct': 'A'},
        ]
        result = calculate_neet_score(responses, mode="nta_pattern")
        self.assertEqual(set(result["subjects_evaluated"]), expected_subjects)

if __name__ == '__main__':
    unittest.main()

