import uuid
from ..ingestion.document_loader import DocumentLoader
from ..chunking.text_chunker import TextChunker

class RAGPipelineService:
    def __init__(self, embedding_provider, vector_store, retriever, prompt_builder, llm):
        self.embedding_provider = embedding_provider
        self.vector_store = vector_store
        self.retriever = retriever
        self.prompt_builder = prompt_builder
        self.llm = llm
        
        self.loader = DocumentLoader()
        self.chunker = TextChunker()

    def ingest_document(self, document_path: str, metadata: dict = None) -> dict:
        metadata = metadata or {}
        document_id = metadata.get('document_id', str(uuid.uuid4()))
        metadata['document_id'] = document_id
        
        # Load
        doc_data = self.loader.load(document_path)
        metadata['title'] = doc_data['title']
        metadata['source_type'] = doc_data['source_type']
        
        return self._process_and_store(doc_data['content'], metadata)
        
    def ingest_text(self, text: str, title: str, metadata: dict = None) -> dict:
        metadata = metadata or {}
        document_id = metadata.get('document_id', str(uuid.uuid4()))
        metadata['document_id'] = document_id
        metadata['title'] = title
        metadata['source_type'] = 'text'
        
        return self._process_and_store(text, metadata)
        
    def _process_and_store(self, text: str, metadata: dict) -> dict:
        # Clean
        clean_text = self.loader.clean_text(text)
        
        # Chunk
        chunks = self.chunker.chunk(clean_text, metadata)
        if not chunks:
            return {"chunk_count": 0, "status": "No text to process"}
            
        # Embed
        texts_to_embed = [c['content'] for c in chunks]
        embeddings = self.embedding_provider.embed_batch(texts_to_embed)
        
        # Store
        chunk_ids = self.vector_store.add_documents(chunks, embeddings)
        
        return {
            "chunk_count": len(chunk_ids),
            "status": "success",
            "document_id": metadata['document_id']
        }
        
    def chat(self, query: str, conversation_history: list[dict], user_context: dict = None, top_k: int = 5) -> dict:
        # Retrieve context chunks from vector database
        retrieved_chunks = []
        try:
            retrieved_chunks = self.retriever.retrieve_with_context(query, user_context or {}, top_k=top_k)
        except Exception:
            try:
                retrieved_chunks = self.retriever.retrieve(query, top_k=top_k)
            except Exception:
                retrieved_chunks = []
            
        # Prompt build with retrieved chunks & history
        messages = self.prompt_builder.build_rag_prompt(query, retrieved_chunks, conversation_history, user_context)
        
        # Determine target token allocation based on requested study depth (optimized for Groq TPM budget)
        depth = (user_context or {}).get('depth', 'comprehensive').lower()
        if depth == 'exhaustive':
            token_limit = 2800  # Detailed textbook explanation
        elif depth == 'quick':
            token_limit = 1500  # Quick summary
        else:
            token_limit = 2500  # Standard comprehensive guide
            
        # Generate with configured LLM
        answer = self.llm.generate(messages, max_tokens=token_limit)
        
        # Format sources
        sources = self.prompt_builder.format_sources(retrieved_chunks) if retrieved_chunks else []
        
        return {
            "answer": answer,
            "sources": sources,
            "retrieval_used": len(retrieved_chunks) > 0,
            "chunks_retrieved": len(retrieved_chunks)
        }
        
    def delete_document(self, document_id: str, chunk_vector_references: list[str] = None) -> bool:
        return self.vector_store.delete_document(document_id)
        
    def get_stats(self) -> dict:
        return self.vector_store.get_collection_stats()
