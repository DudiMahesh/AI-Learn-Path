import re
try:
    import tiktoken
except ImportError:
    tiktoken = None

class TextChunker:
    def __init__(self, chunk_size=512, overlap=50):
        self.chunk_size = chunk_size
        self.overlap = overlap
        
    def chunk(self, text: str, metadata: dict = None) -> list[dict]:
        metadata = metadata or {}
        chunks_str = self.chunk_by_sentences(text, self.chunk_size, self.overlap)
        
        chunks = []
        current_pos = 0
        for i, chunk_text in enumerate(chunks_str):
            start_char = text.find(chunk_text, current_pos)
            if start_char == -1:
                start_char = current_pos
            end_char = start_char + len(chunk_text)
            current_pos = start_char + len(chunk_text) - int(len(chunk_text) * (self.overlap / self.chunk_size))
            
            chunk_data = {
                "content": chunk_text,
                "chunk_index": i,
                "start_char": start_char,
                "end_char": end_char,
                "metadata": metadata.copy()
            }
            chunks.append(chunk_data)
        return chunks
        
    def chunk_by_sentences(self, text: str, max_tokens=512, overlap_tokens=50) -> list[str]:
        sentences = re.split(r'(?<=[.!?])\s+', text)
        chunks = []
        current_chunk = []
        current_length = 0
        
        for sentence in sentences:
            sentence_len = self._count_tokens(sentence)
            if current_length + sentence_len > max_tokens and current_chunk:
                chunks.append(" ".join(current_chunk))
                # Keep overlap
                overlap_length = 0
                overlap_chunk = []
                for s in reversed(current_chunk):
                    s_len = self._count_tokens(s)
                    if overlap_length + s_len > overlap_tokens:
                        break
                    overlap_chunk.insert(0, s)
                    overlap_length += s_len
                current_chunk = overlap_chunk
                current_length = overlap_length
            
            current_chunk.append(sentence)
            current_length += sentence_len
            
        if current_chunk:
            chunks.append(" ".join(current_chunk))
            
        return chunks
        
    def _count_tokens(self, text: str) -> int:
        if tiktoken:
            enc = tiktoken.get_encoding("cl100k_base")
            return len(enc.encode(text))
        return len(text) // 4  # Approximation if tiktoken not available
