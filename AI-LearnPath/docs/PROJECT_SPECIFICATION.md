# AI-Powered Adaptive Learning Path and Personalised Tutoring System for NEET Examination
**Master of Computer Applications (MCA) Final Year Project Specification**

---

## Project Objective

Develop an intelligent, AI-powered personalised learning platform designed specifically for students preparing for the National Eligibility cum Entrance Test (NEET-UG).

The system functions as a personal AI tutor that teaches Physics, Chemistry, and Biology from fundamental concepts to advanced NEET-level questions.

Unlike traditional learning platforms that provide the same content to every student, this system analyses each student's knowledge, learning speed, accuracy, strengths, and weaknesses to generate an individualised learning path.

The AI tutor teaches concepts, provides examples, generates practice questions, conducts assessments, evaluates answers, identifies knowledge gaps, and continuously adapts the learning path based on student performance.

---

## 1. Student Registration and Initial Assessment

- **Registration Module**: Name, email, academic level, NEET prep stage, target examination year (2026), daily study availability, and self-assessed proficiency across Physics, Chemistry, and Biology.
- **Diagnostic Assessment**: Multi-subject baseline test evaluating fundamental concepts and NEET numerical competency.
- **Student Classification**: Machine learning classification via K-Means Clustering and Random Forest into:
  - *Beginner / Foundations Learner*
  - *Intermediate / Core Achiever*
  - *Advanced / High Specialist*
- **Personalised Learning Roadmap**: Prerequisite-aware Directed Acyclic Graph (DAG) generated dynamically based on baseline scores.

---

## 2. Subject-Based Learning Modules

Full coverage of the official NTA NEET (UG) syllabus:

### Physics (16 Chapters)
1. Physics and Measurement
2. Kinematics
3. Laws of Motion
4. Work, Energy and Power
5. Rotational Motion
6. Gravitation
7. Properties of Solids and Liquids
8. Thermodynamics
9. Oscillations and Waves
10. Electrostatics
11. Current Electricity
12. Magnetic Effects of Current & Magnetism
13. Electromagnetic Induction & Alternating Currents
14. Optics (Ray & Wave)
15. Modern Physics (Dual Nature, Atoms, Nuclei)
16. Electronic Devices (Semiconductors)

### Chemistry (3 Divisions)
- **Physical Chemistry**: Some Basic Concepts of Chemistry, Structure of Atom, Chemical Thermodynamics, Solutions, Electrochemistry, Chemical Kinetics.
- **Inorganic Chemistry**: Classification of Elements, p-Block, d- and f-Block Elements, Coordination Compounds.
- **Organic Chemistry**: Purification & Characterisation, Hydrocarbons, Haloalkanes & Haloarenes, Alcohols Phenols Ethers, Aldehydes Ketones Carboxylic Acids, Organic Compounds Containing Nitrogen, Biomolecules.

### Biology (10 Core Units)
1. Diversity in Living World
2. Structural Organisation in Plants and Animals
3. Cell Structure and Function
4. Plant Physiology
5. Human Physiology
6. Reproduction
7. Genetics and Evolution
8. Biology and Human Welfare
9. Biotechnology
10. Ecology and Environment

---

## 3. AI Personal Tutor (7-Step Structured Pedagogy)

The central intelligence module teaching topics with a strict pedagogical sequence:
- **Step 1: Introduction** — Fundamentals without assuming prior knowledge.
- **Step 2: Concept Explanation** — Plain-language definitions, diagrams, and real-world clinical/physical analogies.
- **Step 3: Important Formulas** — Comprehensive variable explanations and units.
- **Step 4: Worked Examples** — Step-by-step solutions progressing from basic to NEET-level numericals.
- **Step 5: Conceptual Understanding** — Formative check-questions verifying student comprehension.
- **Step 6: NEET Exam Relevance** — Frequently tested patterns, NTA question traps, and common misconceptions.
- **Step 7: Chapter Summary** — Rapid revision notes and mnemonics.
- **Interruptibility**: Students can ask questions or seek clarification at any point in the lesson.

---

## 4. Adaptive Learning Path Generation

- **Dynamic DAG Evaluation**: Evaluates topic dependencies (e.g. Newton's laws prior to Gravitation).
- **Mastery Estimation**: Quantifies topic mastery percentage based on quiz performance and study time.
- **Automatic Prerequisite Remediation**: Detects missing foundational concepts and injects remediation topics.
- **Difficulty Tuning**: Automatically scales difficulty based on accuracy and speed.
- **Visual Progress Tracker**: Interactive roadmap nodes displaying current state (Mastered, In Progress, Locked, Remediation).

---

## 5. AI Quiz and Question Generation

- **Question Formats**: Single-correct MCQs, Assertion & Reason, Numerical Physics, Conceptual Chemistry, NCERT Biology.
- **Exam Standards**: 4 options, strictly 1 correct answer, NTA Section B rules (10 attempts out of 15).
- **Pedagogical Feedback**: Detailed explanations for why the correct option is right AND why each distractor is incorrect.
- **Hints & Timers**: Multi-level hints with accuracy and time-per-question telemetry.

---

## 6. Intelligent Performance Analysis

- Comprehensive analytics dashboard:
  - Overall learning progress and NEET percentile prediction.
  - Subject-wise and chapter-wise accuracy breakdowns.
  - Topic mastery percentages.
  - Repeated mistakes detection and misconception analysis.
  - NEET Rank & College Predictor (AIIMS Delhi, Premier State GMC, Private/Deemed cutoffs).

---

## 7. AI Doubt-Solving Assistant

- Grounded in NCERT textbooks via ChromaDB vector retrieval + Google Gemini API.
- Explains step-by-step reasoning rather than merely providing final answers.
- Offers alternative solving methods (e.g., dimensional analysis vs formula derivation).

---

## 8. Revision and Spaced Repetition

- Identifies previously completed chapters and computes forgetting curves.
- Dedicated **NEET Formula Sheet Suite** for Physics and Physical Chemistry.
- NCERT-aligned revision quizzes and flashcard drills.

---

## 9. NEET Mock Examination Module

- Standard 50-Question Subject Papers and 180-minute Full Mock Simulator.
- Official NTA Marking Scheme: **+4 for correct, -1 for incorrect, 0 for unattempted**.
- Question navigation palette, Question status indicators, and "Mark for Review" capability.
- Verified Previous Year Question (PYQ) Papers (NEET 2024, 2023, 2022, 2021).

---

## 10. Personalised Study Planner

- Dynamic calendar generating daily and weekly study targets based on available study hours and target exam date.
- Auto-adjusts when a student completes topics faster or falls behind.

---

## 11. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, KaTeX (math rendering).
- **Backend**: Python 3.12, Flask 3, SQLAlchemy, JWT Authentication.
- **Database**: PostgreSQL (NeonDB serverless cloud) with SQLite local fallback.
- **Machine Learning**: Scikit-learn (K-Means, Random Forest, StandardScaler), NumPy, Pandas.
- **RAG & GenAI**: Google Gemini API, Sentence-Transformers, ChromaDB vector database.

---

## 12. User Interface Design

1. My Learning Path (`/learning-path`)
2. Physics, Chemistry, Biology Modules (`/courses`)
3. AI Personal Tutor (`/courses/ai-tutor` & `/ai-assistant`)
4. Practice Questions & Quizzes (`/courses/quiz`)
5. Mock Tests & PYQ Papers (`/assessments` & `/pyq-papers`)
6. Revision Centre & Formulas (`/courses/formulas`)
7. Performance Analytics & Rank Predictor (`/analytics` & `/dashboard`)
8. Study Planner & Schedule (`/calendar`)
9. Staff & Administration Console (`/adm`)

