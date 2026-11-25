from models import db, AssessmentAttempt, LearningPathItem, LearningPathChangelog

def adapt_learning_path(user_id, assessment_attempt_id):
    attempt = AssessmentAttempt.query.get(assessment_attempt_id)
    if not attempt: return {}
    
    score = attempt.score
    if score < 50:
        action = "add prerequisite reinforcement"
    elif score < 75:
        action = "add practice resources"
    else:
        action = "unlock next topic"
        
    return {"action": action, "message": f"Adapted based on score: {score}"}
