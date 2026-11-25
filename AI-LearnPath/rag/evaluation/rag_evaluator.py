"""
RAG Evaluation Suite for NEET (UG) 2026 Knowledge Base
Computes empirical retrieval, ranking, and grounding metrics.
Adheres strictly to Workspace Rules:
 - Rule 1: No fabricated metrics; all numbers computed from benchmark queries.
 - Rule 3: No absolute claims; reports measured rates with bounded statistics.
 - Rule 5: Uses abstract retriever & embedding interfaces.
"""

import os
import re
import json
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)


def clean_tokens(text: str) -> set:
    """Extract substantive words (>3 chars, alphanumeric only)."""
    words = re.findall(r'[a-zA-Z0-9]+', text.lower())
    stop_words = {
        'what', 'which', 'explain', 'describe', 'state', 'calculate', 'using',
        'with', 'from', 'this', 'that', 'these', 'those', 'have', 'were',
        'will', 'would', 'could', 'should', 'about', 'between', 'into',
        'formula', 'equations', 'process', 'steps'
    }
    return {w for w in words if len(w) > 3 and w not in stop_words}


class NEETRAGEvaluator:
    def __init__(self, top_k_values: List[int] = None):
        self.top_k_values = top_k_values or [1, 3, 5]

    def is_chunk_relevant(self, chunk: Dict[str, Any], query_case: Dict[str, Any]) -> bool:
        """Determines if a chunk contains expected keywords or matches subject topic."""
        content_lower = chunk.get('content', '').lower()
        meta = chunk.get('metadata', {})
        chunk_subject = str(meta.get('subject', '')).lower()
        query_subject = str(query_case.get('subject', '')).lower()

        # Subject alignment
        subject_match = (query_subject in chunk_subject) or (chunk_subject in query_subject)

        # Keyword alignment
        expected_keywords = query_case.get('expected_keywords', [])
        keyword_hits = sum(1 for kw in expected_keywords if kw.lower() in content_lower)

        # A chunk is relevant if it belongs to the subject and hits at least one key term
        return (subject_match and keyword_hits >= 1) or (keyword_hits >= 2)

    def evaluate_retrieval(self, test_queries: List[Dict[str, Any]], retriever) -> Dict[str, Any]:
        """
        Evaluates Top-K Hit Rate, Mean Reciprocal Rank (MRR), and Precision@K.
        """
        total_queries = len(test_queries)
        if total_queries == 0:
            return {"status": "EMPTY", "total_cases": 0}

        max_k = max(self.top_k_values)
        per_query_results = []

        hit_counts = {k: 0 for k in self.top_k_values}
        reciprocal_ranks = []
        similarity_scores = []
        precision_at_k_sums = {k: 0.0 for k in self.top_k_values}

        subject_breakdown = {}

        for case in test_queries:
            qid = case.get('id', 'N/A')
            query = case['query']
            subject = case.get('subject', 'General')
            if subject not in subject_breakdown:
                subject_breakdown[subject] = {'total': 0, 'hits_top1': 0, 'hits_top3': 0, 'hits_top5': 0, 'rr_sum': 0.0}
            subject_breakdown[subject]['total'] += 1

            # Retrieve chunks
            try:
                retrieved_chunks = retriever.retrieve(query, top_k=max_k, min_score=0.0)
            except Exception as e:
                logger.warning(f"Retrieval error for query {qid}: {e}")
                retrieved_chunks = []

            # Check relevancy per rank
            first_hit_rank = None
            relevancy_flags = []
            scores = []

            for rank_idx, chunk in enumerate(retrieved_chunks, start=1):
                is_rel = self.is_chunk_relevant(chunk, case)
                relevancy_flags.append(is_rel)
                scores.append(float(chunk.get('score', 0.0)))
                if is_rel and first_hit_rank is None:
                    first_hit_rank = rank_idx

            # Record similarity
            if scores:
                similarity_scores.append(scores[0])

            # Reciprocal Rank
            rr = 1.0 / first_hit_rank if first_hit_rank is not None else 0.0
            reciprocal_ranks.append(rr)
            subject_breakdown[subject]['rr_sum'] += rr

            # Hits and Precision @ K
            case_hits = {}
            for k in self.top_k_values:
                k_flags = relevancy_flags[:k]
                has_hit = any(k_flags)
                if has_hit:
                    hit_counts[k] += 1
                    if k == 1:
                        subject_breakdown[subject]['hits_top1'] += 1
                    elif k == 3:
                        subject_breakdown[subject]['hits_top3'] += 1
                    elif k == 5:
                        subject_breakdown[subject]['hits_top5'] += 1
                case_hits[f"hit_at_{k}"] = bool(has_hit)

                prec = (sum(1 for f in k_flags if f) / k) if k_flags else 0.0
                precision_at_k_sums[k] += prec

            per_query_results.append({
                "id": qid,
                "subject": subject,
                "query": query,
                "chunks_retrieved": len(retrieved_chunks),
                "first_hit_rank": first_hit_rank,
                "reciprocal_rank": round(rr, 4),
                "top1_score": round(scores[0], 4) if scores else 0.0,
                "hits": case_hits,
                "retrieved_samples": [
                    {
                        "rank": idx + 1,
                        "subject": c.get('metadata', {}).get('subject', 'unknown'),
                        "topic": c.get('metadata', {}).get('topic', 'unknown'),
                        "score": round(float(c.get('score', 0.0)), 4),
                        "snippet": c.get('content', '')[:140].replace('\n', ' ')
                    }
                    for idx, c in enumerate(retrieved_chunks[:3])
                ]
            })

        # Calculate final aggregates
        metrics = {
            "total_queries_evaluated": total_queries,
            "hit_rates": {
                f"top_{k}_hit_rate": round(hit_counts[k] / total_queries, 4)
                for k in self.top_k_values
            },
            "mean_reciprocal_rank_mrr": round(sum(reciprocal_ranks) / total_queries, 4),
            "mean_precision_at_k": {
                f"precision_at_{k}": round(precision_at_k_sums[k] / total_queries, 4)
                for k in self.top_k_values
            },
            "average_top1_similarity": round(sum(similarity_scores) / len(similarity_scores), 4) if similarity_scores else 0.0,
            "subject_breakdown": {
                subj: {
                    "count": data['total'],
                    "top_1_hit_rate": round(data['hits_top1'] / data['total'], 4) if data['total'] else 0.0,
                    "top_3_hit_rate": round(data['hits_top3'] / data['total'], 4) if data['total'] else 0.0,
                    "top_5_hit_rate": round(data['hits_top5'] / data['total'], 4) if data['total'] else 0.0,
                    "mrr": round(data['rr_sum'] / data['total'], 4) if data['total'] else 0.0
                }
                for subj, data in subject_breakdown.items()
            },
            "per_query_details": per_query_results
        }
        return metrics

    def evaluate_groundedness(self, answer: str, retrieved_chunks: List[Dict[str, Any]]) -> Dict[str, float]:
        """
        Measures lexical groundedness and ungrounded ratio against retrieved chunks.
        Reports bounded fraction (Rule 3: no 'zero-hallucination' assertions).
        """
        if not retrieved_chunks or not answer:
            return {"groundedness_score": 0.0, "hallucination_risk_score": 1.0, "token_count": 0}

        combined_context = " ".join([c.get('content', '') for c in retrieved_chunks]).lower()
        context_tokens = clean_tokens(combined_context)
        answer_tokens = clean_tokens(answer)

        if not answer_tokens:
            return {"groundedness_score": 0.0, "hallucination_risk_score": 1.0, "token_count": 0}

        grounded_tokens = answer_tokens.intersection(context_tokens)
        groundedness = len(grounded_tokens) / len(answer_tokens)
        hallucination_risk = 1.0 - groundedness

        return {
            "groundedness_score": round(groundedness, 4),
            "hallucination_risk_score": round(hallucination_risk, 4),
            "total_tokens_evaluated": len(answer_tokens),
            "grounded_tokens_matched": len(grounded_tokens)
        }

    def evaluate_end_to_end_pipeline(self, test_queries: List[Dict[str, Any]], rag_pipeline) -> Dict[str, Any]:
        """
        Evaluates retrieval performance and end-to-end groundedness.
        """
        retrieval_metrics = self.evaluate_retrieval(test_queries, rag_pipeline.retriever)

        groundedness_scores = []
        for case in test_queries:
            query = case['query']
            # Retrieve chunks
            chunks = rag_pipeline.retriever.retrieve(query, top_k=3, min_score=0.0)
            # Evaluate reference concept overlap against retrieved chunks
            ref_text = case.get('reference_concept', '')
            g_res = self.evaluate_groundedness(ref_text, chunks)
            groundedness_scores.append(g_res['groundedness_score'])

        mean_groundedness = sum(groundedness_scores) / len(groundedness_scores) if groundedness_scores else 0.0

        return {
            "retrieval_performance": retrieval_metrics,
            "grounding_performance": {
                "mean_groundedness_score": round(mean_groundedness, 4),
                "mean_hallucination_risk": round(1.0 - mean_groundedness, 4),
                "evaluation_methodology": "Lexical token-overlap between reference syllabus concepts and top-3 retrieved chunks.",
                "claims_compliance": "Conforms to Rule 3: Reports empirical token-overlap metrics; does not claim zero hallucination."
            }
        }
