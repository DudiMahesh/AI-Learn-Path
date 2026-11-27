from flask import Blueprint, request
from utils.response import success_response, error_response
from services.visual_learning_service import generate_educational_visual

visual_bp = Blueprint('visual', __name__)


@visual_bp.route('/generate', methods=['POST'])
def generate_visual():
    """
    Generate or regenerate a syllabus-grounded educational diagram/infographic
    for a NEET (UG) question across Physics, Chemistry, Biology, Botany, or Zoology.
    """
    data = request.get_json(silent=True) or {}
    question = (data.get('question') or data.get('message') or '').strip()
    if not question:
        return error_response("Question is required for visual generation", 400)

    explicit_subject = (data.get('subject') or '').strip() or None
    rag_answer = (data.get('answer') or '').strip()
    regenerate = bool(data.get('regenerate', False))

    # Retrieve relevant NEET syllabus chunks from the existing RAG vector store
    retrieved_chunks = []
    try:
        from services.rag_service import get_pipeline
        pipeline = get_pipeline()
        user_ctx = {'subject': explicit_subject} if explicit_subject else {}
        try:
            retrieved_chunks = pipeline.retriever.retrieve_with_context(question, user_ctx, top_k=4)
        except Exception:
            retrieved_chunks = pipeline.retriever.retrieve(question, top_k=4)
    except Exception:
        retrieved_chunks = []

    visual = generate_educational_visual(
        question=question,
        explicit_subject=explicit_subject,
        retrieved_chunks=retrieved_chunks,
        rag_answer=rag_answer,
        regenerate=regenerate
    )
    return success_response(visual)

