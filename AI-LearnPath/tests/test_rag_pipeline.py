"""
Unit Tests for RAG Architecture & Evaluation Components
Verifies chunking, retriever filtering, groundedness metrics, and Rule 3 compliance.
"""

import sys
import os
import unittest

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from rag.chunking.text_chunker import TextChunker
from rag.evaluation.rag_evaluator import NEETRAGEvaluator, clean_tokens
from rag.llm.grok_llm import GrokLLMProvider
from rag.llm.groq_llm import GroqLLMProvider
from rag.llm.llm_factory import get_llm_provider, DummyLLMProvider


class TestRAGPipeline(unittest.TestCase):
    def setUp(self):
        self.chunker = TextChunker(chunk_size=100, overlap=20)
        self.evaluator = NEETRAGEvaluator()

    def test_text_chunking_with_metadata(self):
        """Chunker produces non-empty chunks and propagates document metadata."""
        sample_text = (
            "Newton's laws of motion describe the relationship between a body and the forces acting upon it. "
            "The first law states an object remains at rest unless acted upon by an external force. "
            "The second law states force equals mass times acceleration. "
            "The third law states for every action there is an equal and opposite reaction. "
        ) * 5
        meta = {"subject": "Physics", "unit": "Laws of Motion"}
        chunks = self.chunker.chunk(sample_text, metadata=meta)

        self.assertGreater(len(chunks), 1)
        for c in chunks:
            self.assertIn("content", c)
            self.assertEqual(c["metadata"]["subject"], "Physics")
            self.assertEqual(c["metadata"]["unit"], "Laws of Motion")

    def test_clean_tokens_filters_stopwords_and_short_words(self):
        """clean_tokens strips punctuation, stopwords, and keeps substantive words >3 chars."""
        text = "What is the formula for the escape velocity from Earth?"
        tokens = clean_tokens(text)
        self.assertIn("escape", tokens)
        self.assertIn("velocity", tokens)
        self.assertIn("earth", tokens)
        self.assertNotIn("what", tokens)
        self.assertNotIn("is", tokens)
        self.assertNotIn("the", tokens)

    def test_groundedness_perfect_overlap(self):
        """Groundedness is 1.0 when all answer terms appear in context."""
        context = [{"content": "Photosynthesis produces glucose and oxygen from carbon dioxide and sunlight."}]
        answer = "Photosynthesis produces glucose and oxygen."
        res = self.evaluator.evaluate_groundedness(answer, context)

        self.assertEqual(res['groundedness_score'], 1.0)
        self.assertEqual(res['hallucination_risk_score'], 0.0)

    def test_groundedness_zero_overlap(self):
        """Groundedness is 0.0 when answer has no terms in context."""
        context = [{"content": "Quantum mechanics explains subatomic particles and wave-particle duality."}]
        answer = "Human digestion starts in the oral cavity with salivary amylase."
        res = self.evaluator.evaluate_groundedness(answer, context)

        self.assertEqual(res['groundedness_score'], 0.0)
        self.assertEqual(res['hallucination_risk_score'], 1.0)

    def test_chunk_relevance_matching(self):
        """Evaluator correctly matches chunk subject and keyword triggers."""
        query_case = {
            "subject": "Physics",
            "expected_keywords": ["projectile", "range", "angle"]
        }
        relevant_chunk = {
            "content": "In projectile motion, horizontal range depends on initial speed and launch angle.",
            "metadata": {"subject": "Physics"}
        }
        irrelevant_chunk = {
            "content": "Mitosis consists of prophase, metaphase, anaphase, and telophase.",
            "metadata": {"subject": "Biology"}
        }

        self.assertTrue(self.evaluator.is_chunk_relevant(relevant_chunk, query_case))
        self.assertFalse(self.evaluator.is_chunk_relevant(irrelevant_chunk, query_case))

    def test_grok_llm_provider_initialization(self):
        """GrokLLMProvider initializes candidate models and base URL correctly."""
        provider = GrokLLMProvider(api_key="xai-test-key-12345")
        self.assertEqual(provider.api_key, "xai-test-key-12345")
        self.assertIn("grok-2-latest", provider.candidate_models)
        self.assertTrue(provider.base_url.startswith("https://api.x.ai/"))

    def test_grok_llm_requires_api_key(self):
        """GrokLLMProvider raises ValueError if api_key is empty."""
        with self.assertRaises(ValueError):
            GrokLLMProvider(api_key="")

    def test_grok_llm_factory_resolution(self):
        """get_llm_provider resolves grok correctly."""
        os.environ["GROK_API_KEY"] = "xai-factory-test-key"
        provider = get_llm_provider("grok")
        self.assertIsInstance(provider, GrokLLMProvider)
        self.assertEqual(provider.api_key, "xai-factory-test-key")

    def test_grok_dummy_fallback_when_key_is_placeholder(self):
        """get_llm_provider returns helpful DummyLLMProvider if key is unset or placeholder."""
        os.environ["GROK_API_KEY"] = "your_xai_grok_api_key_here"
        provider = get_llm_provider("grok")
        self.assertIsInstance(provider, DummyLLMProvider)
        resp = provider.generate([{"role": "user", "content": "Hello"}])
        self.assertIn("GROK_API_KEY", resp)

    def test_groq_llm_provider_initialization(self):
        """GroqLLMProvider initializes candidate models and base URL correctly."""
        provider = GroqLLMProvider(api_key="gsk_test_mock_key_123")
        self.assertEqual(provider.api_key, "gsk_test_mock_key_123")
        self.assertIn("llama-3.3-70b-versatile", provider.candidate_models)
        self.assertTrue(provider.base_url.startswith("https://api.groq.com/"))

    def test_groq_llm_requires_api_key(self):
        """GroqLLMProvider raises ValueError if api_key is empty."""
        with self.assertRaises(ValueError):
            GroqLLMProvider(api_key="")

    def test_groq_llm_factory_resolution(self):
        """get_llm_provider resolves groq correctly."""
        os.environ["GROQ_API_KEY"] = "gsk_factory_test_key"
        provider = get_llm_provider("groq")
        self.assertIsInstance(provider, GroqLLMProvider)
        self.assertEqual(provider.api_key, "gsk_factory_test_key")

    def test_groq_ygsk_auto_sanitization(self):
        """get_llm_provider automatically sanitizes accidental ygsk_ prefix to gsk_."""
        os.environ["GROQ_API_KEY"] = "ygsk_factory_sanitization_test"
        provider = get_llm_provider("groq")
        self.assertIsInstance(provider, GroqLLMProvider)
        self.assertEqual(provider.api_key, "gsk_factory_sanitization_test")

    def test_groq_dummy_fallback_when_key_is_placeholder(self):
        """get_llm_provider returns helpful DummyLLMProvider if groq key is placeholder."""
        os.environ["GROQ_API_KEY"] = "your_free_groq_api_key_here"
        provider = get_llm_provider("groq")
        self.assertIsInstance(provider, DummyLLMProvider)
        resp = provider.generate([{"role": "user", "content": "Hello"}])
        self.assertIn("GROQ_API_KEY", resp)


if __name__ == '__main__':
    unittest.main()

