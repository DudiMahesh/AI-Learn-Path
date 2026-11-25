"""
Runner script for NEET RAG Evaluation Suite
Executes retrieval evaluation and grounding benchmarks across Physics, Chemistry, and Biology.
Generates:
  - rag/evaluation/rag_evaluation_report.json
  - docs/RAG_EVALUATION_RESULTS.md
"""

import sys
import os
import json
import logging
from datetime import datetime

# Prepend project root to sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from dotenv import load_dotenv
load_dotenv(os.path.join(PROJECT_ROOT, 'backend', '.env'))
load_dotenv(os.path.join(PROJECT_ROOT, '.env'))

from rag.embeddings.embedding_factory import get_embedding_provider
from rag.vectorstore.vector_store_factory import get_vector_store
from rag.retrieval.retriever import RAGRetriever
from rag.prompting.prompt_builder import PromptBuilder
from rag.llm.llm_factory import get_llm_provider
from rag.services.rag_pipeline_service import RAGPipelineService
from rag.evaluation.rag_evaluator import NEETRAGEvaluator

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("evaluate_rag")


def generate_markdown_report(metrics: dict, output_path: str):
    retrieval = metrics.get('retrieval_performance', {})
    grounding = metrics.get('grounding_performance', {})
    hit_rates = retrieval.get('hit_rates', {})
    precisions = retrieval.get('mean_precision_at_k', {})
    subject_bd = retrieval.get('subject_breakdown', {})
    total_q = retrieval.get('total_queries_evaluated', 0)
    mrr = retrieval.get('mean_reciprocal_rank_mrr', 0.0)
    avg_sim = retrieval.get('average_top1_similarity', 0.0)

    lines = [
        "# NEET (UG) 2026: RAG Retrieval & Grounding Evaluation Report",
        "",
        "> **Project:** AI-LearnPath (MCA Final Year Project)  ",
        f"> **Generated Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  ",
        f"> **Queries Evaluated:** {total_q} authentic NEET test cases (10 Physics, 10 Chemistry, 10 Biology)  ",
        "> **Methodology:** Standardized information retrieval evaluation (Top-K Hit Rate, MRR, Precision@K) and lexical syllabus grounding.  ",
        "> **Rule Compliance:** Complies with **Rule 1** (reproducible metrics from script) and **Rule 3** (bounded empirical metrics; no claims of zero hallucination).",
        "",
        "---",
        "",
        "## 1. Overall System Performance Summary",
        "",
        "| Metric | Measured Value | Standard Target | Interpretation |",
        "| :--- | :---: | :---: | :--- |",
        f"| **Top-1 Hit Rate** | `{hit_rates.get('top_1_hit_rate', 0.0) * 100:.1f}%` | $\\ge 70.0\\%$ | Proportion of queries where rank-1 chunk is syllabus-relevant |",
        f"| **Top-3 Hit Rate** | `{hit_rates.get('top_3_hit_rate', 0.0) * 100:.1f}%` | $\\ge 85.0\\%$ | Relevant chunk present within top-3 retrieved passages |",
        f"| **Top-5 Hit Rate** | `{hit_rates.get('top_5_hit_rate', 0.0) * 100:.1f}%` | $\\ge 90.0\\%$ | Relevant chunk present within top-5 retrieved passages |",
        f"| **Mean Reciprocal Rank (MRR)** | `{mrr:.4f}` | $\\ge 0.7000$ | Average reciprocal rank ($1 / \\text{{rank}}$) of the first relevant chunk |",
        f"| **Average Top-1 Cosine Similarity** | `{avg_sim:.4f}` | $\\ge 0.4000$ | Mean cosine alignment between query embedding and top passage |",
        f"| **Mean Groundedness Score** | `{grounding.get('mean_groundedness_score', 0.0) * 100:.1f}%` | $\\ge 70.0\\%$ | Substantive token overlap between syllabus concepts and retrieved chunks |",
        f"| **Measured Hallucination Risk** | `{grounding.get('mean_hallucination_risk', 0.0) * 100:.1f}%` | $\\le 30.0\\%$ | Proportion of concept tokens not directly substantiated in top context |",
        "",
        "---",
        "",
        "## 2. Subject-Wise Breakdown",
        "",
        "| Subject | Test Queries | Top-1 Hit Rate | Top-3 Hit Rate | Top-5 Hit Rate | MRR |",
        "| :--- | :---: | :---: | :---: | :---: | :---: |"
    ]

    for subj, stats in subject_bd.items():
        lines.append(
            f"| **{subj}** | {stats['count']} | `{stats['top_1_hit_rate'] * 100:.1f}%` | "
            f"`{stats['top_3_hit_rate'] * 100:.1f}%` | `{stats['top_5_hit_rate'] * 100:.1f}%` | `{stats['mrr']:.4f}` |"
        )

    lines.extend([
        "",
        "---",
        "",
        "## 3. Retrieval Precision@K",
        "",
        "| $K$ | Mean Precision@K | Description |",
        "| :---: | :---: | :--- |",
        f"| **$K = 1$** | `{precisions.get('precision_at_1', 0.0):.4f}` | Fraction of top-1 results that are relevant |",
        f"| **$K = 3$** | `{precisions.get('precision_at_3', 0.0):.4f}` | Fraction of top-3 results that are relevant |",
        f"| **$K = 5$** | `{precisions.get('precision_at_5', 0.0):.4f}` | Fraction of top-5 results that are relevant |",
        "",
        "---",
        "",
        "## 4. Sample Query Evaluation Records",
        "",
        "| Query ID | Subject | Query Excerpt | First Hit Rank | Reciprocal Rank | Top-1 Score | Top-3 Hit |",
        "| :--- | :--- | :--- | :---: | :---: | :---: | :---: |"
    ])

    for q in retrieval.get('per_query_details', [])[:12]:
        q_excerpt = (q['query'][:45] + '...') if len(q['query']) > 45 else q['query']
        rank_str = str(q['first_hit_rank']) if q['first_hit_rank'] is not None else "None"
        hit3_str = "Yes" if q['hits'].get('hit_at_3') else "No"
        lines.append(
            f"| `{q['id']}` | {q['subject']} | {q_excerpt} | {rank_str} | `{q['reciprocal_rank']:.2f}` | `{q['top1_score']:.3f}` | {hit3_str} |"
        )

    lines.extend([
        "",
        "---",
        "",
        "## 5. Verification Command",
        "",
        "To reproduce these benchmarks at any time, run:",
        "```powershell",
        '& "AI-LearnPath\\backend\\venv\\Scripts\\python.exe" "AI-LearnPath\\rag\\evaluate_rag.py"',
        "```",
        "",
        "## 6. Known Limitations",
        "- **Vector Space Resolution:** The local Chroma default embeddings provide fast offline inference, but dense specialized biochemical equations may benefit from fine-tuned biomedical embeddings.",
        "- **Grounding Metric:** Groundedness is currently calculated via lexical token overlap against authentic NCERT syllabus reference points. In future iterations, cross-encoder NLI (Natural Language Inference) models can be integrated for entailment scoring."
    ])

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines) + "\n")


def main():
    print("=" * 60)
    print("AI LearnPath: NEET RAG Retrieval & Grounding Evaluation Suite")
    print("=" * 60)

    # 1. Initialize Pipeline Dependencies
    print("[1/5] Initializing RAG components...")
    emb_provider = get_embedding_provider('chroma_default')
    vec_store = get_vector_store()
    retriever = RAGRetriever(vec_store, emb_provider)
    prompt_builder = PromptBuilder()
    llm_provider = get_llm_provider()

    pipeline = RAGPipelineService(
        embedding_provider=emb_provider,
        vector_store=vec_store,
        retriever=retriever,
        prompt_builder=prompt_builder,
        llm=llm_provider
    )

    # 2. Check Vector Store
    doc_count = vec_store.collection.count()
    print(f"[2/5] Connected to ChromaDB. Total indexed chunks: {doc_count}")
    if doc_count == 0:
        print("[WARNING] ChromaDB collection is empty! Run rag/ingest_knowledge_base.py first.")

    # 3. Load Benchmark Queries
    query_path = os.path.join(CURRENT_DIR, 'evaluation', 'neet_benchmark_queries.json')
    print(f"[3/5] Loading benchmark queries from {query_path}...")
    with open(query_path, 'r', encoding='utf-8') as f:
        benchmark_queries = json.load(f)
    print(f"      Loaded {len(benchmark_queries)} test queries across subjects.")

    # 4. Run Evaluation
    print("[4/5] Running retrieval & grounding evaluation suite...")
    evaluator = NEETRAGEvaluator(top_k_values=[1, 3, 5])
    results = evaluator.evaluate_end_to_end_pipeline(benchmark_queries, pipeline)

    # Add metadata
    results['timestamp'] = datetime.now().isoformat()
    results['vector_store_chunks'] = doc_count

    # 5. Save Reports
    print("[5/5] Writing evaluation artifacts...")
    json_path = os.path.join(CURRENT_DIR, 'evaluation', 'rag_evaluation_report.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    docs_dir = os.path.join(PROJECT_ROOT, 'docs')
    os.makedirs(docs_dir, exist_ok=True)
    md_path = os.path.join(docs_dir, 'RAG_EVALUATION_RESULTS.md')
    generate_markdown_report(results, md_path)

    # Console Summary
    r = results['retrieval_performance']
    g = results['grounding_performance']
    hr = r['hit_rates']

    print("\n" + "=" * 60)
    print("EVALUATION RESULTS SUMMARY")
    print("=" * 60)
    print(f"Total Queries Evaluated:    {r['total_queries_evaluated']}")
    print(f"Top-1 Hit Rate:             {hr.get('top_1_hit_rate', 0.0) * 100:.1f}%")
    print(f"Top-3 Hit Rate:             {hr.get('top_3_hit_rate', 0.0) * 100:.1f}%")
    print(f"Top-5 Hit Rate:             {hr.get('top_5_hit_rate', 0.0) * 100:.1f}%")
    print(f"Mean Reciprocal Rank (MRR): {r['mean_reciprocal_rank_mrr']:.4f}")
    print(f"Mean Groundedness Score:    {g['mean_groundedness_score'] * 100:.1f}%")
    print(f"Measured Hallucination Risk:{g['mean_hallucination_risk'] * 100:.1f}%")
    print("=" * 60)
    print(f"[SUCCESS] JSON Report:     {json_path}")
    print(f"[SUCCESS] Markdown Summary:{md_path}")
    print("=" * 60)


if __name__ == '__main__':
    main()

