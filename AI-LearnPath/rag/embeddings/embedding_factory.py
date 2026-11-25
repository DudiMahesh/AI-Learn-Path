import os
from .embedding_interface import EmbeddingProvider
from .chroma_embeddings import ChromaDefaultEmbeddingProvider
from .gemini_embeddings import GeminiEmbeddingProvider

def get_embedding_provider(provider: str = None) -> EmbeddingProvider:
    provider = provider or os.getenv('EMBEDDING_PROVIDER', 'chroma_default')
    
    if provider == 'gemini':
        api_key = os.getenv('LLM_API_KEY') or os.getenv('GEMINI_API_KEY')
        if api_key:
            try:
                return GeminiEmbeddingProvider(api_key=api_key)
            except Exception as e:
                print(f"Warning: Gemini embedding failed to init ({e}), using local Chroma embedding.")
                return ChromaDefaultEmbeddingProvider()
        return ChromaDefaultEmbeddingProvider()
        
    return ChromaDefaultEmbeddingProvider()
