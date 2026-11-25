import re
import os
import logging
from bs4 import BeautifulSoup
try:
    import pymupdf as fitz  # Modern PyMuPDF API
except ImportError:
    try:
        import fitz
    except ImportError:
        fitz = None

logger = logging.getLogger(__name__)

class DocumentLoader:
    def __init__(self):
        pass
        
    def load(self, file_path: str) -> dict:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
            
        ext = os.path.splitext(file_path)[1].lower()
        title = os.path.basename(file_path)
        content = ""
        source_type = ext.lstrip('.')
        
        try:
            if ext == '.pdf':
                if fitz is None:
                    raise ImportError("PyMuPDF (fitz) is required for PDF parsing.")
                doc = fitz.open(file_path)
                content = "\n".join([page.get_text() for page in doc])
            elif ext in ['.txt', '.md']:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            elif ext in ['.html', '.htm']:
                with open(file_path, 'r', encoding='utf-8') as f:
                    soup = BeautifulSoup(f.read(), 'html.parser')
                    content = soup.get_text(separator='\n')
            else:
                raise ValueError(f"Unsupported file format: {ext}")
        except Exception as e:
            logger.error(f"Error loading {file_path}: {str(e)}")
            raise e
            
        return {
            "title": title,
            "content": self.clean_text(content),
            "source_type": source_type,
            "metadata": {"file_path": file_path}
        }
        
    def load_from_text(self, text: str, title: str) -> dict:
        return {
            "title": title,
            "content": self.clean_text(text),
            "source_type": "text",
            "metadata": {}
        }
        
    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        # Remove excessive whitespace
        text = re.sub(r'\n{3,}', '\n\n', text)
        text = re.sub(r'[ \t]{2,}', ' ', text)
        # Fix basic encoding issues if needed (usually handled by utf-8 read)
        return text.strip()
