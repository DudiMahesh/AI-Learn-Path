import os
from .vector_store_interface import VectorStore
from .chroma_store import ChromaVectorStore

def get_vector_store(store_type: str = None) -> VectorStore:
    store_type = store_type or os.getenv('VECTOR_STORE_TYPE', 'chroma')
    
    if store_type == 'chroma':
        return ChromaVectorStore()
        
    raise ValueError(f"Unknown store type: {store_type}")
