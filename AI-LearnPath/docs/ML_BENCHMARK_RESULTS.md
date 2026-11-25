# AI LearnPath: Machine Learning Evaluation & Benchmarks

**Workspace Rules Adherence:**  
- **Rule 1:** Zero fabricated numbers. All metrics derived from running `ml/evaluate_models.py`.
- **Rule 2:** Segregated reporting between Synthetic and Real data.
- **Rule 3:** Measured empirical bounds without absolute marketing claims.

---

## 1. Synthetic Data Evaluation (N = 1200)

> **Data Provenance:** Synthetic diagnostic cohort generated via `ml/data/generate_neet_data.py` modeling official NTA NEET Gaussian score distributions.

### Table 1: Supervised Model — Random Forest Classifier (Skill-Tier Prediction)

| Metric | Measured Value | Target Criterion | Status |
| :--- | :---: | :---: | :---: |
| **Accuracy** | **93.92%** (0.9392) | $\ge 80.0\%$ | Validated |
| **Precision (Macro)** | **84.85%** (0.8485) | $\ge 75.0\%$ | Validated |
| **Recall (Macro)** | **96.43%** (0.9643) | $\ge 75.0\%$ | Validated |
| **F1-Score (Macro)** | **89.78%** (0.8978) | $\ge 75.0\%$ | Validated |

#### Confusion Matrix (Synthetic Test Cohort)
*Rows: Ground Truth | Columns: Model Prediction (Beginner, Intermediate, Advanced)*

```
             Pred: Beg   Pred: Int   Pred: Adv
Actual: Beg   154        2          0         
Actual: Int   40         883        29        
Actual: Adv   0          2          90        
```

---

### Table 2: Unsupervised Model — K-Means Clustering (Persona Segmentation)

| Metric | Measured Value | Theoretical Interpretation |
| :--- | :---: | :--- |
| **Silhouette Score** | **0.1761** | Measures cluster cohesion vs separation (Scale: -1 to +1). Positive indicates well-separated clusters. |
| **Davies-Bouldin Index** | **1.7553** | Lower values signify better clustering with minimal inter-cluster overlap. |
| **Cluster Inertia** | **3986.02** | Sum of squared distances of samples to their closest cluster center. |

#### Cluster Distribution (3 Learning Personas)
- **Cluster_0:** 373 students
- **Cluster_1:** 343 students
- **Cluster_2:** 484 students

---

## 2. Real Production Data Evaluation (Segregated)

> **Policy:** Under Non-Negotiable Rule 1 and Rule 2, real-data metrics are never filled with placeholder numbers or speculative values.

### Table 3: Empirical Real-User Assessment Benchmarks

| Metric | Production Measured Value | Status | Next Milestone |
| :--- | :---: | :---: | :--- |
| **Sample Size (N)** | **0** | `PENDING` | Requires minimum 50 completed diagnostic attempts |
| **Random Forest Accuracy** | *PENDING* | `PENDING` | Collect from `assessment_attempts` table |
| **Precision (Macro)** | *PENDING* | `PENDING` | Requires real student answer keys |
| **Recall (Macro)** | *PENDING* | `PENDING` | Compute via `evaluate_models.py --real` |
| **K-Means Silhouette** | *PENDING* | `PENDING` | Compute post 50 user registrations |

---

## 3. How to Reproduce & Verify

Run the automated evaluation runner from project root:
```powershell
& "AI-LearnPath\backend\venv\Scripts\python.exe" "AI-LearnPath\ml\evaluate_models.py"
```
Generated reports are stored at:
- `AI-LearnPath/ml/evaluation/synthetic_evaluation_report.json`
- `AI-LearnPath/ml/evaluation/real_evaluation_report.json`
