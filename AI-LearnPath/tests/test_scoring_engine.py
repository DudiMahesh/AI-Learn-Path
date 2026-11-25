"""
Unit Tests for NEET (UG) Scoring Engine
Verifies NTA marking rules (+4 / -1 / 0), 50-question paper calculations,
accuracy metrics, and boundary conditions.
"""

import unittest


def calculate_neet_score(responses: list, mode: str = "standard_50") -> dict:
    """
    Evaluates NEET responses according to official NTA scoring parameters.
    responses: list of dicts [{'id': 1, 'selected': 'B', 'correct': 'B', 'section': 'A'}, ...]
    mode: 'standard_50' (all 50 evaluated, max 200) or 'nta_pattern' (35 Section A + 10 of 15 Section B, max 180).
    """
    if mode == "nta_pattern":
        sec_a = [r for r in responses if r.get('section', 'A') == 'A']
        sec_b = [r for r in responses if r.get('section', 'A') == 'B']
        
        # Section A: all evaluated
        eval_responses = list(sec_a)
        
        # Section B: only first 10 attempted evaluated
        sec_b_attempted = [r for r in sec_b if r.get('selected') is not None]
        sec_b_unattempted = [r for r in sec_b if r.get('selected') is None]
        eval_responses.extend(sec_b_attempted[:10])
        eval_responses.extend(sec_b_attempted[10:])  # extra attempted are ignored from scoring
        # unattempted in Section B
        eval_responses.extend(sec_b_unattempted[:max(0, 10 - len(sec_b_attempted))])
    else:
        eval_responses = responses[:50]

    correct_count = 0
    incorrect_count = 0
    unattempted_count = 0

    for idx, resp in enumerate(eval_responses):
        # In nta_pattern, ignore Section B attempts beyond 10
        if mode == "nta_pattern" and resp.get('section') == 'B':
            b_attempts_so_far = sum(1 for r in eval_responses[:idx] if r.get('section') == 'B' and r.get('selected') is not None)
            if resp.get('selected') is not None and b_attempts_so_far >= 10:
                continue

        sel = resp.get('selected')
        corr = resp.get('correct')

        if sel is None or sel == "":
            unattempted_count += 1
        elif sel == corr:
            correct_count += 1
        else:
            incorrect_count += 1

    total_attempted = correct_count + incorrect_count
    accuracy = (correct_count / total_attempted * 100.0) if total_attempted > 0 else 0.0
    raw_score = (correct_count * 4) - (incorrect_count * 1)
    max_possible = 180 if mode == "nta_pattern" else 200

    return {
        "total_questions": len(eval_responses),
        "attempted": total_attempted,
        "correct": correct_count,
        "incorrect": incorrect_count,
        "unattempted": unattempted_count,
        "raw_score": raw_score,
        "max_possible_score": max_possible,
        "accuracy_rate": round(accuracy, 2),
        "negative_penalty": incorrect_count * 1
    }


class TestNEETScoringEngine(unittest.TestCase):
    def test_perfect_score_standard_50(self):
        """All 50 questions answered correctly -> 200 marks, 100% accuracy."""
        responses = [{'id': i, 'selected': 'A', 'correct': 'A'} for i in range(1, 51)]
        res = calculate_neet_score(responses, mode="standard_50")
        self.assertEqual(res['correct'], 50)
        self.assertEqual(res['incorrect'], 0)
        self.assertEqual(res['unattempted'], 0)
        self.assertEqual(res['raw_score'], 200)
        self.assertEqual(res['accuracy_rate'], 100.0)

    def test_all_incorrect_standard_50(self):
        """All 50 questions answered incorrectly -> -50 marks, 0% accuracy."""
        responses = [{'id': i, 'selected': 'B', 'correct': 'A'} for i in range(1, 51)]
        res = calculate_neet_score(responses, mode="standard_50")
        self.assertEqual(res['correct'], 0)
        self.assertEqual(res['incorrect'], 50)
        self.assertEqual(res['raw_score'], -50)
        self.assertEqual(res['negative_penalty'], 50)
        self.assertEqual(res['accuracy_rate'], 0.0)

    def test_completely_unattempted_paper(self):
        """All 50 unattempted -> 0 marks, 0 penalty, 0% accuracy."""
        responses = [{'id': i, 'selected': None, 'correct': 'A'} for i in range(1, 51)]
        res = calculate_neet_score(responses, mode="standard_50")
        self.assertEqual(res['correct'], 0)
        self.assertEqual(res['incorrect'], 0)
        self.assertEqual(res['unattempted'], 50)
        self.assertEqual(res['raw_score'], 0)
        self.assertEqual(res['negative_penalty'], 0)

    def test_mixed_realistic_performance(self):
        """30 correct (+120), 10 incorrect (-10), 10 unattempted (0) -> 110 marks, 75% accuracy."""
        responses = []
        for i in range(1, 31):
            responses.append({'id': i, 'selected': 'A', 'correct': 'A'})
        for i in range(31, 41):
            responses.append({'id': i, 'selected': 'B', 'correct': 'A'})
        for i in range(41, 51):
            responses.append({'id': i, 'selected': None, 'correct': 'A'})

        res = calculate_neet_score(responses, mode="standard_50")
        self.assertEqual(res['correct'], 30)
        self.assertEqual(res['incorrect'], 10)
        self.assertEqual(res['unattempted'], 10)
        self.assertEqual(res['raw_score'], 110)
        self.assertEqual(res['accuracy_rate'], 75.0)

    def test_nta_pattern_section_b_cap(self):
        """
        NTA Section B rule: Max 10 attempts evaluated out of 15.
        Section A: 35 questions all correct (+140).
        Section B: 15 questions answered, first 10 correct (+40), remaining 5 incorrect (should be ignored).
        Expected score: 140 + 40 = 180 out of 180.
        """
        responses = []
        # Section A: 35 correct
        for i in range(1, 36):
            responses.append({'id': i, 'selected': 'A', 'correct': 'A', 'section': 'A'})
        # Section B: 10 correct + 5 incorrect
        for i in range(36, 46):
            responses.append({'id': i, 'selected': 'A', 'correct': 'A', 'section': 'B'})
        for i in range(46, 51):
            responses.append({'id': i, 'selected': 'B', 'correct': 'A', 'section': 'B'})

        res = calculate_neet_score(responses, mode="nta_pattern")
        self.assertEqual(res['raw_score'], 180)
        self.assertEqual(res['correct'], 45)
        self.assertEqual(res['max_possible_score'], 180)


if __name__ == '__main__':
    unittest.main()

