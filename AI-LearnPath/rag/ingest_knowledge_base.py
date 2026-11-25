import sys
import os
from dotenv import load_dotenv

# Ensure the parent directory is in the sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from rag.embeddings.embedding_factory import get_embedding_provider
from rag.vectorstore.vector_store_factory import get_vector_store
from rag.retrieval.retriever import RAGRetriever
from rag.prompting.prompt_builder import PromptBuilder
from rag.llm.llm_factory import get_llm_provider
from rag.services.rag_pipeline_service import RAGPipelineService
from rag.services.knowledge_base_service import KnowledgeBaseService

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    load_dotenv(os.path.join(root_dir, 'backend', '.env'))
    load_dotenv(os.path.join(root_dir, '.env'))
    print("Initializing RAG Pipeline dependencies...")
    
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
    
    kb_service = KnowledgeBaseService()
    
    print("Ingesting sample knowledge base documents...")
    res = kb_service.ingest_builtin_content(pipeline)
    
    print(f"\nIngestion Complete: {res['total_ingested']} documents successfully ingested.")
    print("Detailed Summary:")
    for doc in res['summary']:
        print(f" - {doc['file']}: {doc['status']} ({doc['chunks']} chunks)")

if __name__ == "__main__":
    main()
