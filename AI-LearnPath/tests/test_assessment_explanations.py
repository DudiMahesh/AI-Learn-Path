"""
Automated tests for Post-Assessment MCQ Explanations.
Verifies that all review questions include 'why_correct', 'why_wrong' (when incorrect),
and detailed concept rationales.
"""
import unittest
import sys, os

# Ensure backend directory is in path
backend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'backend')
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from routes.assessment import build_mcq_review_payload


class DummyQuestion:
    def __init__(self, id, text, options, correct_option, explanation=None):
        self.id = id
        self.text = text
        self.options = options
        self.correct_option = correct_option
        self.explanation = explanation


class TestAssessmentMCQExplanations(unittest.TestCase):

    def test_incorrect_answer_has_why_wrong_and_why_correct(self):
        """When an option is answered incorrectly, both why_wrong and why_correct are returned."""
        q = DummyQuestion(
            id=1,
            text="What is the dimensional formula of Universal Gravitational Constant (G)?",
            options={"A": "[M⁻¹ L³ T⁻²]", "B": "[M¹ L² T⁻¹]", "C": "[M⁰ L² T⁻²]", "D": "[M⁻² L² T⁻¹]"},
            correct_option="A"
        )
        # Student answered B (wrong)
        payload = build_mcq_review_payload(q, selected="B", is_correct=False, is_attempted=True)
        
        self.assertFalse(payload['is_correct'])
        self.assertEqual(payload['selected_option'], 'B')
        self.assertEqual(payload['correct_option'], 'A')
        self.assertIsNotNone(payload.get('why_wrong'))
        self.assertIn("Option B is incorrect", payload['why_wrong'])
        self.assertIsNotNone(payload.get('why_correct'))
        self.assertIn("[M^-1 L^3 T^-2]", payload['why_correct'])

    def test_correct_answer_has_why_correct_and_no_why_wrong(self):
        """When an option is answered correctly, why_correct is provided and why_wrong is None."""
        q = DummyQuestion(
            id=2,
            text="For a projectile launched at an angle θ with speed u, what angle yields maximum horizontal range?",
            options={"A": "30°", "B": "45°", "C": "60°", "D": "90°"},
            correct_option="B"
        )
        # Student answered B (correct)
        payload = build_mcq_review_payload(q, selected="B", is_correct=True, is_attempted=True)
        
        self.assertTrue(payload['is_correct'])
        self.assertEqual(payload['selected_option'], 'B')
        self.assertIsNone(payload.get('why_wrong'))
        self.assertIsNotNone(payload.get('why_correct'))
        self.assertIn("45 deg", payload['why_correct'])

    def test_unanswered_question_has_why_correct_and_no_why_wrong(self):
        """When a question is skipped, why_correct is provided and why_wrong is None."""
        q = DummyQuestion(
            id=3,
            text="According to First Law of Thermodynamics, dQ = dU + dW. For an isothermal process of an ideal gas, what is dU?",
            options={"A": "Positive", "B": "Negative", "C": "0", "D": "Depends on volume"},
            correct_option="C"
        )
        payload = build_mcq_review_payload(q, selected=None, is_correct=False, is_attempted=False)
        
        self.assertEqual(payload['status'], 'unanswered')
        self.assertIsNone(payload['selected_option'])
        self.assertIsNone(payload.get('why_wrong'))
        self.assertIsNotNone(payload.get('why_correct'))
        self.assertIn("dU = 0", payload['why_correct'])

    def test_explicit_explanation_preservation(self):
        """If question already has an explanation attribute, it is preserved."""
        q = DummyQuestion(
            id=4,
            text="Custom test question",
            options={"A": "Alpha", "B": "Beta"},
            correct_option="A",
            explanation="Custom step-by-step verified explanation."
        )
        payload = build_mcq_review_payload(q, selected="B", is_correct=False, is_attempted=True)
        self.assertEqual(payload['why_correct'], "Custom step-by-step verified explanation.")


if __name__ == '__main__':
    unittest.main()

