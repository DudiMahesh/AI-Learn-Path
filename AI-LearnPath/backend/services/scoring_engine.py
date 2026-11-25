"""
NEET (UG) 2026 Official Scoring Engine

Implements the official National Testing Agency (NTA) scoring rules:
- Exam Duration: 3 hours 20 minutes (200 minutes)
- Total Questions: 200 Questions total across 4 Subjects:
  * Physics (35 Section A + 15 Section B) -> 45 to attempt (180 Marks)
  * Chemistry (35 Section A + 15 Section B) -> 45 to attempt (180 Marks)
  * Botany (35 Section A + 15 Section B) -> 45 to attempt (180 Marks)
  * Zoology (35 Section A + 15 Section B) -> 45 to attempt (180 Marks)
- Questions to Attempt: 180 Questions total (45 questions per subject)
- Marking Scheme:
  * +4 for each correct answer
  * -1 for each incorrect answer
  * 0 for unattempted questions
- Maximum Score: 720 Marks (180 questions * 4 marks)
- Section B Cap: If a candidate attempts more than 10 questions in Section B of any subject,
  only the first 10 attempted questions are evaluated.
"""

def calculate_neet_score(responses: list, mode: str = "nta_pattern") -> dict:
    """
    Evaluates NEET responses according to official NTA scoring parameters.
    responses: list of dicts [{'id': 1, 'selected': 'B', 'correct': 'B', 'section': 'A', 'subject': 'Physics'}, ...]
    mode: 'nta_pattern' (35 Section A + 10 of 15 Section B per subject, max 720 for full exam or 180 for single subject)
          or 'standard_50' (all 50 evaluated, max 200).
    """
    if mode == "nta_pattern":
        # Group by subject if present, or evaluate single subject
        subjects = {}
        for r in responses:
            sub = r.get('subject', 'General')
            if sub not in subjects:
                subjects[sub] = []
            subjects[sub].append(r)

        total_correct = 0
        total_incorrect = 0
        total_unattempted = 0
        total_eval_questions = 0

        for sub, sub_responses in subjects.items():
            sec_a = [r for r in sub_responses if r.get('section', 'A') == 'A' or 'Section A' in str(r.get('section', ''))]
            sec_b = [r for r in sub_responses if r.get('section') == 'B' or 'Section B' in str(r.get('section', ''))]

            # If section tags are not explicitly provided, first 35 are Sec A, remaining are Sec B
            if not sec_a and not sec_b and len(sub_responses) > 35:
                sec_a = sub_responses[:35]
                sec_b = sub_responses[35:50]
            elif not sec_a and not sec_b:
                sec_a = sub_responses
                sec_b = []

            # Section A: all evaluated
            for r in sec_a:
                total_eval_questions += 1
                sel = r.get('selected')
                corr = r.get('correct')
                if sel is None or sel == "":
                    total_unattempted += 1
                elif sel == corr:
                    total_correct += 1
                else:
                    total_incorrect += 1

            # Section B: only first 10 attempted are evaluated
            b_attempts = 0
            for r in sec_b:
                sel = r.get('selected')
                corr = r.get('correct')
                if sel is None or sel == "":
                    total_unattempted += 1
                    total_eval_questions += 1
                else:
                    if b_attempts < 10:
                        b_attempts += 1
                        total_eval_questions += 1
                        if sel == corr:
                            total_correct += 1
                        else:
                            total_incorrect += 1
                    else:
                        # Exceeded 10 attempted questions in Section B: ignored per NTA regulations
                        pass

        total_attempted = total_correct + total_incorrect
        accuracy = (total_correct / total_attempted * 100.0) if total_attempted > 0 else 0.0
        raw_score = (total_correct * 4) - (total_incorrect * 1)
        
        # Max marks calculation: 180 per subject, up to 720 for full 4-subject exam
        num_subjects = max(1, len(subjects))
        max_possible = 720 if len(responses) >= 180 else (180 * num_subjects)

        return {
            "total_questions": len(responses),
            "questions_evaluated": total_eval_questions,
            "questions_attempted": total_attempted,
            "correct_answers": total_correct,
            "incorrect_answers": total_incorrect,
            "unattempted": total_unattempted,
            "raw_score": raw_score,
            "max_possible_score": max_possible,
            "percentage": max(0, round((raw_score / max_possible * 100.0), 1)),
            "accuracy": round(accuracy, 1),
            "exam_duration_minutes": 200,
            "subjects_evaluated": list(subjects.keys())
        }

    # standard_50 evaluation
    eval_responses = responses[:50]
    correct_count = 0
    incorrect_count = 0
    unattempted_count = 0

    for resp in eval_responses:
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
    max_possible = 200

    return {
        "total_questions": len(eval_responses),
        "questions_attempted": total_attempted,
        "correct_answers": correct_count,
        "incorrect_answers": incorrect_count,
        "unattempted": unattempted_count,
        "raw_score": raw_score,
        "max_possible_score": max_possible,
        "percentage": max(0, round((raw_score / max_possible * 100.0), 1)),
        "accuracy": round(accuracy, 1)
    }

