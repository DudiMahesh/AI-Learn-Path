"""
Unit Tests for NEET All India Rank (AIR) & Cutoff Predictor Engine
Verifies percentile mapping, AIR estimation bounds, college tier assignment,
and edge conditions (0 to 720 marks).
"""

import unittest


def calculate_neet_rank_and_percentile(score: float) -> dict:
    """
    Mathematical model approximating official NTA historical percentile & rank distributions.
    """
    bounded_score = max(0, min(720, round(float(score))))

    if bounded_score >= 680:
        percentile = 99.85 + ((bounded_score - 680) / 40.0) * 0.14
        air_min = max(1, round(1500 - ((bounded_score - 680) / 40.0) * 1499))
        air_max = max(50, round(2500 - ((bounded_score - 680) / 40.0) * 2400))
        tier_name = 'AIIMS / MAMC / JIPMER Elite Tier'
    elif bounded_score >= 620:
        percentile = 98.40 + ((bounded_score - 620) / 60.0) * 1.45
        air_min = round(12000 - ((bounded_score - 620) / 60.0) * 9500)
        air_max = round(16000 - ((bounded_score - 620) / 60.0) * 11000)
        tier_name = 'Premier State Government Medical Colleges (GMC)'
    elif bounded_score >= 540:
        percentile = 92.50 + ((bounded_score - 540) / 80.0) * 5.90
        air_min = round(55000 - ((bounded_score - 540) / 80.0) * 39000)
        air_max = round(68000 - ((bounded_score - 540) / 80.0) * 48000)
        tier_name = 'State Government & Semi-Govt Medical Colleges'
    elif bounded_score >= 450:
        percentile = 84.00 + ((bounded_score - 450) / 90.0) * 8.50
        air_min = round(145000 - ((bounded_score - 450) / 90.0) * 77000)
        air_max = round(175000 - ((bounded_score - 450) / 90.0) * 95000)
        tier_name = 'Private / Deemed University MBBS & BDS'
    else:
        percentile = max(5.0, (bounded_score / 450.0) * 84.0)
        air_min = round(850000 - (bounded_score / 450.0) * 650000)
        air_max = round(1000000 - (bounded_score / 450.0) * 780000)
        tier_name = 'Foundational Preparation Zone'

    return {
        "score": bounded_score,
        "percentile": min(99.99, round(percentile, 2)),
        "air_min": max(1, air_min),
        "air_max": max(air_min + 50, air_max),
        "tier_name": tier_name,
        "is_qualified": bounded_score >= 164
    }


class TestNEETRankPredictor(unittest.TestCase):
    def test_perfect_score_720(self):
        """Score 720 should predict top percentile, AIR 1, and AIIMS Elite Tier."""
        res = calculate_neet_rank_and_percentile(720)
        self.assertEqual(res['score'], 720)
        self.assertGreaterEqual(res['percentile'], 99.9)
        self.assertEqual(res['air_min'], 1)
        self.assertEqual(res['tier_name'], 'AIIMS / MAMC / JIPMER Elite Tier')
        self.assertTrue(res['is_qualified'])

    def test_high_performer_score_650(self):
        """Score 650 should fall in Premier State GMC tier with AIR < 10,000."""
        res = calculate_neet_rank_and_percentile(650)
        self.assertGreaterEqual(res['percentile'], 98.5)
        self.assertLessEqual(res['percentile'], 99.8)
        self.assertLess(res['air_min'], 10000)
        self.assertEqual(res['tier_name'], 'Premier State Government Medical Colleges (GMC)')
        self.assertTrue(res['is_qualified'])

    def test_cutoff_qualification_boundary(self):
        """Score 164 is qualified; score 163 is below cutoff."""
        res_qualified = calculate_neet_rank_and_percentile(164)
        res_unqualified = calculate_neet_rank_and_percentile(163)
        self.assertTrue(res_qualified['is_qualified'])
        self.assertFalse(res_unqualified['is_qualified'])

    def test_boundary_clamping(self):
        """Negative scores clamp to 0; scores > 720 clamp to 720."""
        res_neg = calculate_neet_rank_and_percentile(-50)
        res_over = calculate_neet_rank_and_percentile(999)
        self.assertEqual(res_neg['score'], 0)
        self.assertEqual(res_over['score'], 720)

    def test_foundations_tier_mapping(self):
        """Score 285 (Persona 1 Aarav Sharma) falls in Foundational Preparation Zone."""
        res = calculate_neet_rank_and_percentile(285)
        self.assertEqual(res['tier_name'], 'Foundational Preparation Zone')
        self.assertTrue(res['is_qualified'])  # 285 > 164 cutoff
        self.assertGreater(res['air_min'], 200000)


if __name__ == '__main__':
    unittest.main()
