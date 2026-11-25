# AI LearnPath: Workspace Rules

**Project:** MCA Final-Year Project — Adaptive Learning & RAG Platform for NEET (UG) 2026  
**Stack:** React 18 + Vite + Tailwind | Flask 3 + SQLAlchemy + JWT | PostgreSQL (NeonDB) | scikit-learn | ChromaDB + Gemini + sentence-transformers  
**Layout:** `frontend/`, `backend/`, `ml/`, `rag/`, `database/`, `docs/`, `tests/`  

---

## Non-Negotiable Rules

1. **Empirical Integrity & No Fabrication:**  
   Never fabricate metrics, datasets, citations, or results. Every number in documentation must derive from an executable script. If data or evaluation benchmarks are missing, build the evaluation pipeline and explicitly mark results as `"PENDING"`.

2. **Synthetic vs. Real Data Segregation:**  
   Report synthetic-data and real-data results strictly separately in distinct files, tables, and sections.

3. **Measured & Objective Language (No Absolute Claims):**  
   Avoid absolute marketing claims in docs (e.g., "zero-hallucination", "100%", "best"). Objectively describe what is measured, testing conditions, confidence bounds, and error rates.

4. **API Stability & Backward Compatibility:**  
   Do not break existing API routes. Keep changes modular, non-destructive, and backward compatible.

5. **Provider Abstractions & Dynamic Configuration:**  
   Maintain `VectorStore`, `EmbeddingProvider`, and `LLMProvider` abstractions. Never hardcode model names; always read them from environment variables (`.env`).

6. **Automated Testing Mandatory:**  
   Every new or refactored module must include automated unit/integration tests. Run and verify all tests before marking any task or phase complete.

7. **Security & Data Safety:**  
   Never commit credentials, API keys, or `.env` files. Never run destructive database operations (`DROP`, `TRUNCATE`, broad `DELETE`) without explicit user authorization.

8. **Phased Execution & Implementation Plans:**  
   Work strictly one phase at a time. Produce an **Implementation Plan** artifact first and wait for explicit user approval before modifying code.

9. **Walkthrough Documentation:**  
   After completing each phase, produce a **Walkthrough** artifact detailing: files changed, commands to run, test results, and known limitations.

10. **Proactive Clarification:**  
    If any requirement, specification, or file path is ambiguous or missing, ask the user directly rather than making assumptions.

