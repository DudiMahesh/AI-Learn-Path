from flask import Blueprint, request, jsonify
from utils.auth import require_auth, require_admin, get_current_user
from utils.response import success_response, error_response
from models import db
from models.rag_models import RAGConversation, RAGMessage, RAGDocument
from services.rag_service import chat as rag_chat, ingest_document as rag_ingest, delete_document_from_store, reindex_all
from datetime import datetime

rag_bp = Blueprint('rag', __name__)

@rag_bp.route('/chat', methods=['POST'])
def do_chat():
    data = request.get_json(silent=True) or {}
    message = data.get('message', '').strip()
    if not message:
        return error_response("Message cannot be empty", 400)
        
    conversation_id = data.get('conversation_id')
    user_context = data.get('context', {}) or {}
    if data.get('depth'):
        user_context['depth'] = data.get('depth')
    if data.get('subject'):
        user_context['subject'] = data.get('subject')
    
    user = None
    try:
        from flask_jwt_extended import verify_jwt_in_request
        verify_jwt_in_request(optional=True)
        user = get_current_user()
    except Exception:
        user = None

    if not user:
        from models.user import User
        user = User.query.filter_by(role='student').first() or User.query.first()
        if not user:
            user = User(name='NEET Student', email='student@ailearnpath.com', role='student')
            db.session.add(user)
            db.session.commit()
        
    conv = None
    if conversation_id:
        conv = RAGConversation.query.filter_by(id=conversation_id, user_id=user.id).first()
        
    if not conv:
        conv = RAGConversation(user_id=user.id, title=message[:45] + ('...' if len(message) > 45 else ''))
        db.session.add(conv)
        db.session.flush()
        
    # Get recent conversation history
    past_messages = RAGMessage.query.filter_by(conversation_id=conv.id).order_by(RAGMessage.created_at.asc()).limit(10).all()
    history = [{'role': m.role, 'content': m.content} for m in past_messages]
    
    # Add user message
    user_msg = RAGMessage(conversation_id=conv.id, role='user', content=message)
    db.session.add(user_msg)
    db.session.flush()
    
    # Add user career context if available
    if user.career_id and not user_context.get('career_goal'):
        try:
            from models.career import Career
            career = Career.query.get(user.career_id)
            if career:
                user_context['career_goal'] = career.name
        except Exception:
            pass
            
    # Run RAG Chat
    result = rag_chat(user.id, conv.id, message, history, user_context)
    
    ai_msg = RAGMessage(
        conversation_id=conv.id,
        role='assistant',
        content=result.get('answer', '')
    )
    db.session.add(ai_msg)
    db.session.commit()
    
    return success_response({
        'conversation_id': conv.id,
        'answer': result.get('answer'),
        'sources': result.get('sources', []),
        'retrieval_used': result.get('retrieval_used', False)
    })

@rag_bp.route('/conversations', methods=['GET'])
@require_auth
def get_conversations():
    user = get_current_user()
    if not user:
        return error_response("User not found", 401)
        
    convs = RAGConversation.query.filter_by(user_id=user.id).order_by(RAGConversation.created_at.desc()).all()
    return success_response([c.to_dict() for c in convs])

@rag_bp.route('/conversations', methods=['POST'])
@require_auth
def create_conversation():
    user = get_current_user()
    if not user:
        return error_response("User not found", 401)
        
    data = request.get_json(silent=True) or {}
    title = data.get('title', 'New Chat')
    
    conv = RAGConversation(user_id=user.id, title=title)
    db.session.add(conv)
    db.session.commit()
    return success_response(conv.to_dict())

@rag_bp.route('/conversations/<int:id>', methods=['GET'])
@require_auth
def get_conversation(id):
    user = get_current_user()
    if not user:
        return error_response("User not found", 401)
        
    conv = RAGConversation.query.filter_by(id=id, user_id=user.id).first()
    if not conv:
        return error_response("Conversation not found", 404)
        
    messages = RAGMessage.query.filter_by(conversation_id=conv.id).order_by(RAGMessage.created_at.asc()).all()
    d = conv.to_dict()
    d['messages'] = [m.to_dict() for m in messages]
    return success_response(d)

@rag_bp.route('/conversations/<int:id>', methods=['DELETE'])
@require_auth
def delete_conversation(id):
    user = get_current_user()
    if not user:
        return error_response("User not found", 401)
        
    conv = RAGConversation.query.filter_by(id=id, user_id=user.id).first()
    if not conv:
        return error_response("Conversation not found", 404)
        
    RAGMessage.query.filter_by(conversation_id=conv.id).delete()
    db.session.delete(conv)
    db.session.commit()
    return success_response({"message": "Conversation deleted"})

@rag_bp.route('/conversations/<int:id>/rename', methods=['PUT'])
@require_auth
def rename_conversation(id):
    user = get_current_user()
    if not user:
        return error_response("User not found", 401)
        
    data = request.get_json(silent=True) or {}
    title = data.get('title', '').strip()
    if not title:
        return error_response("Title required", 400)
        
    conv = RAGConversation.query.filter_by(id=id, user_id=user.id).first()
    if not conv:
        return error_response("Conversation not found", 404)
        
    conv.title = title
    db.session.commit()
    return success_response(conv.to_dict())

@rag_bp.route('/documents', methods=['GET'])
@require_auth
def get_documents():
    docs = RAGDocument.query.order_by(RAGDocument.created_at.desc()).all()
    return success_response([d.to_dict() for d in docs])

@rag_bp.route('/documents/upload', methods=['POST'])
@require_admin
def upload_document():
    # Handle file upload or text document
    title = request.form.get('title', 'Uploaded Document')
    file = request.files.get('file')
    if not file:
        return error_response("No file provided", 400)
        
    import os
    upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads')
    os.makedirs(upload_dir, exist_ok=True)
    filepath = os.path.join(upload_dir, file.filename)
    file.save(filepath)
    
    doc = RAGDocument(title=title, file_path=filepath)
    db.session.add(doc)
    db.session.commit()
    
    rag_ingest(doc.id, filepath, title)
    return success_response(doc.to_dict())

@rag_bp.route('/documents/<int:id>', methods=['DELETE'])
@require_admin
def delete_document(id):
    doc = RAGDocument.query.get(id)
    if not doc:
        return error_response("Document not found", 404)
        
    delete_document_from_store(doc.id)
    db.session.delete(doc)
    db.session.commit()
    return success_response({"message": "Document deleted"})

@rag_bp.route('/documents/reindex', methods=['POST'])
@require_admin
def do_reindex():
    res = reindex_all()
    return success_response(res)
