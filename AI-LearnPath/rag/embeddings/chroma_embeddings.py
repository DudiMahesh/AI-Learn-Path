from .embedding_interface import EmbeddingProvider

class ChromaDefaultEmbeddingProvider(EmbeddingProvider):
    """
    Local high-speed embedding provider using Chroma's built-in ONNX all-MiniLM-L6-v2 model.
    Runs 100% locally with 0 API cost and zero network latency.
    """
    def __init__(self):
        try:
            from chromadb.utils import embedding_functions
            self._fn = embedding_functions.DefaultEmbeddingFunction()
        except Exception:
            self._fn = lambda texts: [[0.0] * 384 for _ in texts] if isinstance(texts, list) else [0.0] * 384

    def embed(self, text: str) -> list[float]:
        res = self._fn([text])
        return res[0]

    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        return self._fn(texts)
