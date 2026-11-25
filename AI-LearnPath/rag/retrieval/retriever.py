class RAGRetriever:
    def __init__(self, vector_store, embedding_provider):
        self.vector_store = vector_store
        self.embedding_provider = embedding_provider
        
    def retrieve(self, query: str, top_k: int = 5, filters: dict = None, min_score: float = 0.3) -> list[dict]:
        # 1. Embed query
        query_embedding = self.embedding_provider.embed(query)
        
        # 2. Search vector store
        results = self.vector_store.search(
            query_embedding=query_embedding,
            top_k=top_k,
            filters=filters
        )
        
        # 3. Filter by min_score (hallucination control)
        filtered_results = [r for r in results if r['score'] >= min_score]
        
        return filtered_results
        
    def retrieve_with_context(self, query: str, user_context: dict, top_k: int = 5) -> list[dict]:
        # Enhance query with context
        enhanced_query = f"User Context: Goal: {user_context.get('career_goal', 'None')}, "
        enhanced_query += f"Topic: {user_context.get('current_topic', 'None')}. "
        enhanced_query += f"Query: {query}"
        
        return self.retrieve(enhanced_query, top_k=top_k)
