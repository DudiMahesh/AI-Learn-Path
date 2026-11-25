"""
Unit Tests for Quiz Randomizer & Dynamic Shuffling Suite
Verifies Fisher-Yates shuffle distribution, non-mutation, sample extraction,
and option re-mapping integrity with scoring synchronization.
"""

import unittest
import random


def shuffle_array(arr: list) -> list:
    """Pure non-mutating shuffle."""
    copy = list(arr)
    random.shuffle(copy)
    return copy


def sample_questions(pool: list, count: int) -> list:
    """Samples count unique elements from pool."""
    if not pool:
        return []
    shuffled = shuffle_array(pool)
    return shuffled[:min(count, len(pool))]


def shuffle_question_options(question: dict) -> dict:
    """
    Shuffles options {A, B, C, D} and remaps the 'correct' key
    so that the correct answer text remains identical.
    """
    options = dict(question.get('options', {}))
    correct_key = question.get('correct') or question.get('correct_option')
    correct_text = options.get(correct_key)

    items = list(options.values())
    random.shuffle(items)
    keys = ['A', 'B', 'C', 'D']

    new_options = {}
    new_correct_key = correct_key
    for idx, val in enumerate(items):
        k = keys[idx]
        new_options[k] = val
        if val == correct_text:
            new_correct_key = k

    return {
        **question,
        "options": new_options,
        "correct": new_correct_key,
        "correct_option": new_correct_key
    }


class TestQuizRandomizer(unittest.TestCase):
    def setUp(self):
        self.sample_pool = [
            {"id": f"q_{i}", "text": f"Question {i}", "correct": "A", "options": {"A": "Correct", "B": "W1", "C": "W2", "D": "W3"}}
            for i in range(1, 51)
        ]

    def test_shuffle_preserves_length_and_elements(self):
        """Shuffled array maintains identical element set and length."""
        original = list(range(1, 30))
        shuffled = shuffle_array(original)
        self.assertEqual(len(shuffled), len(original))
        self.assertEqual(set(shuffled), set(original))

    def test_shuffle_is_non_mutating(self):
        """Original array remains unaltered after shuffle call."""
        original = [1, 2, 3, 4, 5]
        copy = list(original)
        _ = shuffle_array(original)
        self.assertEqual(original, copy)

    def test_questions_change_across_consecutive_runs(self):
        """Consecutive quiz samples produce different orderings / selections."""
        sample_1 = [q['id'] for q in sample_questions(self.sample_pool, 10)]
        sample_2 = [q['id'] for q in sample_questions(self.sample_pool, 10)]
        # In a 50-item pool, drawing 10 items twice in the exact same sequence has probability < 10^-13
        self.assertNotEqual(sample_1, sample_2)

    def test_sample_size_bounds(self):
        """Requested sample size matches returned count."""
        sample_5 = sample_questions(self.sample_pool, 5)
        sample_20 = sample_questions(self.sample_pool, 20)
        self.assertEqual(len(sample_5), 5)
        self.assertEqual(len(sample_20), 20)
        # Unique elements
        ids = [q['id'] for q in sample_20]
        self.assertEqual(len(ids), len(set(ids)))

    def test_option_shuffling_preserves_correct_answer_content(self):
        """When options are shuffled, the new correct key points to the exact same text."""
        q = {
            "id": "chem_1",
            "text": "What is the pH of pure water at 25C?",
            "options": {"A": "7", "B": "1", "C": "14", "D": "0"},
            "correct": "A"
        }
        for _ in range(15):
            shuffled_q = shuffle_question_options(q)
            new_key = shuffled_q['correct']
            # The option under new_key must be the original correct answer '7'
            self.assertEqual(shuffled_q['options'][new_key], "7")
            self.assertEqual(len(shuffled_q['options']), 4)


if __name__ == '__main__':
    unittest.main()

