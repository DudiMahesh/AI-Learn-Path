class VectorStore:
    def add_documents(self, documents: list[dict], embeddings: list[list[float]]) -> list[str]:
        raise NotImplementedError
        
    def search(self, query_embedding: list[float], top_k: int = 5, filters: dict = None) -> list[dict]:
        raise NotImplementedError
        
    def delete_document(self, document_id: str) -> bool:
        raise NotImplementedError
        
    def get_collection_stats(self) -> dict:
        raise NotImplementedError
