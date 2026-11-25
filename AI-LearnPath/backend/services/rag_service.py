import os
import sys
import logging

# Ensure root is in sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from rag.embeddings.embedding_factory import get_embedding_provider
from rag.vectorstore.vector_store_factory import get_vector_store
from rag.retrieval.retriever import RAGRetriever
from rag.prompting.prompt_builder import PromptBuilder
from rag.llm.llm_factory import get_llm_provider
from rag.services.rag_pipeline_service import RAGPipelineService

logger = logging.getLogger(__name__)

_pipeline_instance = None

def get_pipeline():
    global _pipeline_instance
    if _pipeline_instance is None:
        try:
            emb_provider = get_embedding_provider('chroma_default')
            vec_store = get_vector_store()
            retriever = RAGRetriever(vec_store, emb_provider)
            prompt_builder = PromptBuilder()
            from backend.config.settings import Config
            provider_name = Config.LLM_PROVIDER or os.getenv('LLM_PROVIDER', 'grok')
            llm_provider = get_llm_provider(provider_name)
            
            _pipeline_instance = RAGPipelineService(
                embedding_provider=emb_provider,
                vector_store=vec_store,
                retriever=retriever,
                prompt_builder=prompt_builder,
                llm=llm_provider
            )
        except Exception as e:
            logger.error(f"Failed to initialize RAG pipeline: {e}")
            raise e
    return _pipeline_instance

def chat(user_id: int, conversation_id: int, message: str, history: list = None, user_context: dict = None) -> dict:
    try:
        pipeline = get_pipeline()
        res = pipeline.chat(
            query=message,
            conversation_history=history or [],
            user_context=user_context or {},
            top_k=4
        )
        # Enhance and sanitize diagrams to guarantee high-resolution 3D SVG output
        try:
            from services.diagram_enhancer import enhance_diagrams_in_answer
            if res and 'answer' in res and res['answer']:
                res['answer'] = enhance_diagrams_in_answer(
                    res['answer'],
                    query=message,
                    subject=(user_context or {}).get('subject', '')
                )
        except Exception as de_err:
            logger.warning(f"Diagram enhancement warning: {de_err}")
            
        return res
    except Exception as e:
        logger.error(f"Error in RAG chat: {e}")
        return {
            'answer': "I'm having trouble processing your question right now. Please verify your connection or try again in a moment.",
            'sources': [],
            'retrieval_used': False
        }

def ingest_document(doc_id: int, filepath: str, title: str, source_type: str = 'text') -> dict:
    try:
        pipeline = get_pipeline()
        return pipeline.ingest_document(filepath, {'document_id': str(doc_id), 'title': title, 'source_type': source_type})
    except Exception as e:
        logger.error(f"Error ingesting document {doc_id}: {e}")
        return {'success': False, 'error': str(e)}

def delete_document_from_store(doc_id: int) -> bool:
    try:
        pipeline = get_pipeline()
        return pipeline.delete_document(str(doc_id))
    except Exception as e:
        logger.error(f"Error deleting document {doc_id}: {e}")
        return False

def reindex_all() -> dict:
    try:
        from rag.services.knowledge_base_service import KnowledgeBaseService
        kb = KnowledgeBaseService()
        pipeline = get_pipeline()
        return kb.ingest_builtin_content(pipeline)
    except Exception as e:
        logger.error(f"Error in reindex_all: {e}")
        return {'message': f"Error: {str(e)}"}
