import os
import uuid
from .vector_store_interface import VectorStore

class ChromaVectorStore(VectorStore):
    def __init__(self):
        import os
        import uuid
        try:
            import chromadb
        except ImportError:
            chromadb = None
        root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        default_path = os.path.join(root_dir, 'rag', 'chroma_db')
        env_path = os.getenv('VECTOR_DB_PATH', default_path)
        if not os.path.isabs(env_path):
            candidate = os.path.join(root_dir, env_path.lstrip('./').lstrip('.\\'))
            db_path = candidate if os.path.exists(candidate) else default_path
        else:
            db_path = env_path

        os.makedirs(db_path, exist_ok=True)
        self.client = chromadb.PersistentClient(path=db_path)
        self.collection = self.client.get_or_create_collection(
            name='ai_learnpath_knowledge',
            metadata={"hnsw:space": "cosine"}
        )
        
    def add_documents(self, documents: list[dict], embeddings: list[list[float]]) -> list[str]:
        ids = []
        metadatas = []
        documents_content = []
        
        for doc in documents:
            chunk_id = doc.get('chunk_id') or str(uuid.uuid4())
            ids.append(chunk_id)
            documents_content.append(doc['content'])
            
            # Ensure metadata values are strings, ints, or floats for Chroma
            meta = doc.get('metadata', {})
            clean_meta = {k: v for k, v in meta.items() if isinstance(v, (str, int, float, bool))}
            metadatas.append(clean_meta)
            
        self.collection.add(
            ids=ids,
            embeddings=embeddings,
            metadatas=metadatas,
            documents=documents_content
        )
        return ids
        
    def search(self, query_embedding: list[float], top_k: int = 5, filters: dict = None) -> list[dict]:
        where = filters if filters else None
        
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where=where,
            include=['documents', 'metadatas', 'distances']
        )
        
        output = []
        if not results['ids'][0]:
            return output
            
        for i in range(len(results['ids'][0])):
            # Convert distance to a similarity score (assuming cosine space: 1 - distance)
            distance = results['distances'][0][i]
            score = 1.0 - distance
            
            output.append({
                'chunk_id': results['ids'][0][i],
                'content': results['documents'][0][i],
                'metadata': results['metadatas'][0][i],
                'score': score
            })
            
        return output
        
    def delete_document(self, document_id: str) -> bool:
        try:
            self.collection.delete(
                where={"document_id": document_id}
            )
            return True
        except Exception:
            return False
            
    def get_collection_stats(self) -> dict:
        return {
            "total_chunks": self.collection.count()
        }
