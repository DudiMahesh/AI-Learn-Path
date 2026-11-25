# NEET (UG) 2026: RAG Retrieval & Grounding Evaluation Report

> **Project:** AI-LearnPath (MCA Final Year Project)  
> **Generated Date:** 2026-11-12 13:27:25  
> **Queries Evaluated:** 30 authentic NEET test cases (10 Physics, 10 Chemistry, 10 Biology)  
> **Methodology:** Standardized information retrieval evaluation (Top-K Hit Rate, MRR, Precision@K) and lexical syllabus grounding.  
> **Rule Compliance:** Complies with **Rule 1** (reproducible metrics from script) and **Rule 3** (bounded empirical metrics; no claims of zero hallucination).

---

## 1. Overall System Performance Summary

| Metric | Measured Value | Standard Target | Interpretation |
| :--- | :---: | :---: | :--- |
| **Top-1 Hit Rate** | `80.0%` | $\ge 70.0\%$ | Proportion of queries where rank-1 chunk is syllabus-relevant |
| **Top-3 Hit Rate** | `93.3%` | $\ge 85.0\%$ | Relevant chunk present within top-3 retrieved passages |
| **Top-5 Hit Rate** | `96.7%` | $\ge 90.0\%$ | Relevant chunk present within top-5 retrieved passages |
| **Mean Reciprocal Rank (MRR)** | `0.8694` | $\ge 0.7000$ | Average reciprocal rank ($1 / \text{rank}$) of the first relevant chunk |
| **Average Top-1 Cosine Similarity** | `0.4039` | $\ge 0.4000$ | Mean cosine alignment between query embedding and top passage |
| **Mean Groundedness Score** | `54.3%` | $\ge 70.0\%$ | Substantive token overlap between syllabus concepts and retrieved chunks |
| **Measured Hallucination Risk** | `45.7%` | $\le 30.0\%$ | Proportion of concept tokens not directly substantiated in top context |

---

## 2. Subject-Wise Breakdown

| Subject | Test Queries | Top-1 Hit Rate | Top-3 Hit Rate | Top-5 Hit Rate | MRR |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Physics** | 10 | `70.0%` | `90.0%` | `90.0%` | `0.8000` |
| **Chemistry** | 10 | `70.0%` | `90.0%` | `100.0%` | `0.8083` |
| **Biology** | 10 | `100.0%` | `100.0%` | `100.0%` | `1.0000` |

---

## 3. Retrieval Precision@K

| $K$ | Mean Precision@K | Description |
| :---: | :---: | :--- |
| **$K = 1$** | `0.8000` | Fraction of top-1 results that are relevant |
| **$K = 3$** | `0.5889` | Fraction of top-3 results that are relevant |
| **$K = 5$** | `0.5000` | Fraction of top-5 results that are relevant |

---

## 4. Sample Query Evaluation Records

| Query ID | Subject | Query Excerpt | First Hit Rank | Reciprocal Rank | Top-1 Score | Top-3 Hit |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| `NEET-PHY-01` | Physics | What is the formula for least count of a Vern... | 1 | `1.00` | `0.673` | Yes |
| `NEET-PHY-02` | Physics | Derive the horizontal range and maximum heigh... | 1 | `1.00` | `0.681` | Yes |
| `NEET-PHY-03` | Physics | Explain Newton's second law of motion and imp... | 1 | `1.00` | `0.286` | Yes |
| `NEET-PHY-04` | Physics | What is the work-energy theorem and conservat... | 1 | `1.00` | `0.446` | Yes |
| `NEET-PHY-05` | Physics | What is escape velocity from Earth's surface ... | 1 | `1.00` | `0.460` | Yes |
| `NEET-PHY-06` | Physics | State the first and second laws of thermodyna... | 2 | `0.50` | `0.202` | Yes |
| `NEET-PHY-07` | Physics | Explain simple harmonic motion time period fo... | 1 | `1.00` | `0.505` | Yes |
| `NEET-PHY-08` | Physics | State Coulomb's law and electric field due to... | 1 | `1.00` | `0.195` | Yes |
| `NEET-PHY-09` | Physics | What is Snell's law of refraction and critica... | None | `0.00` | `0.240` | No |
| `NEET-PHY-10` | Physics | Explain Einstein photoelectric equation and d... | 2 | `0.50` | `0.388` | Yes |
| `NEET-CHEM-01` | Chemistry | What are quantum numbers and Pauli exclusion ... | 2 | `0.50` | `0.322` | Yes |
| `NEET-CHEM-02` | Chemistry | Explain periodic trends in ionization enthalp... | 1 | `1.00` | `0.304` | Yes |

---

## 5. Verification Command

To reproduce these benchmarks at any time, run:
```powershell
& "AI-LearnPath\backend\venv\Scripts\python.exe" "AI-LearnPath\rag\evaluate_rag.py"
```

## 6. Known Limitations
- **Vector Space Resolution:** The local Chroma default embeddings provide fast offline inference, but dense specialized biochemical equations may benefit from fine-tuned biomedical embeddings.
- **Grounding Metric:** Groundedness is currently calculated via lexical token overlap against authentic NCERT syllabus reference points. In future iterations, cross-encoder NLI (Natural Language Inference) models can be integrated for entailment scoring.
