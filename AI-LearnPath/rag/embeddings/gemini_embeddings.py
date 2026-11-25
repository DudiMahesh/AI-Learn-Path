import os
import time
import logging
from .embedding_interface import EmbeddingProvider

logger = logging.getLogger(__name__)

class GeminiEmbeddingProvider(EmbeddingProvider):
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("API key is required for Gemini embeddings")
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            self.genai = genai
        except ImportError:
            self.genai = None
        env_emb = os.getenv('GEMINI_EMBEDDING_MODEL') or os.getenv('EMBEDDING_MODEL')
        self.model = env_emb or 'models/text-embedding-004'
        
    def embed(self, text: str) -> list[float]:
        return self._embed_with_retry(text)
        
    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        embeddings = []
        for text in texts:
            embeddings.append(self.embed(text))
        return embeddings
        
    def _embed_with_retry(self, text: str, max_retries=3) -> list[float]:
        if not self.genai:
            return [0.0] * 768
        for attempt in range(max_retries):
            try:
                result = self.genai.embed_content(
                    model=self.model,
                    content=text,
                    task_type="retrieval_document"
                )
                return result['embedding']
            except Exception as e:
                # Try fallback model if 404
                if 'not found' in str(e).lower() and self.model != 'models/embedding-001':
                    self.model = 'models/embedding-001'
                logger.warning(f"Embedding attempt {attempt + 1}/{max_retries} failed: {str(e)}")
                if attempt == max_retries - 1:
                    # Fallback dummy embedding if API limits hit
                    return [0.0] * 768
                time.sleep(1)
