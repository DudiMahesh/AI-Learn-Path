from .embedding_interface import EmbeddingProvider
import logging

logger = logging.getLogger(__name__)

class SentenceTransformerEmbeddingProvider(EmbeddingProvider):
    def __init__(self):
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
        except ImportError:
            logger.error("sentence_transformers is not installed.")
            raise ImportError("Please install sentence-transformers to use this provider.")
            
    def embed(self, text: str) -> list[float]:
        return self.model.encode(text).tolist()
        
    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        embeddings = self.model.encode(texts)
        return [emb.tolist() for emb in embeddings]
