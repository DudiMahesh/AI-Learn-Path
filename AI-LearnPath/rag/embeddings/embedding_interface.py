class EmbeddingProvider:
    def embed(self, text: str) -> list[float]:
        raise NotImplementedError
        
    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        raise NotImplementedError
