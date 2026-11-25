import os
from .llm_interface import LLMProvider
from .gemini_llm import GeminiLLMProvider
from .grok_llm import GrokLLMProvider
from .groq_llm import GroqLLMProvider

class DummyLLMProvider(LLMProvider):
    def __init__(self, message: str = None):
        self.message = message or "This is a dummy response. Please configure your GROQ_API_KEY in .env to enable AI generation."

    def generate(self, messages: list[dict], max_tokens: int = 1000) -> str:
        return self.message

def get_llm_provider(provider: str = None) -> LLMProvider:
    provider = (provider or os.getenv('LLM_PROVIDER', 'groq')).strip().lower()

    # Groq (Groq Inc. LPU Cloud - 100% Free Meta LLaMA 3.3)
    if provider in ('groq', 'groq-cloud', 'groqcloud'):
        api_key = os.getenv('GROQ_API_KEY') or os.getenv('LLM_API_KEY')
        if api_key and not api_key.startswith('your_') and api_key != 'your_free_groq_api_key_here':
            # Clean any accidental leading characters if user typed 'ygsk_' instead of 'gsk_'
            if api_key.startswith('ygsk_'):
                api_key = api_key[1:]
            return GroqLLMProvider(api_key=api_key)
        else:
            print("WARNING: GROQ_API_KEY not found or set to placeholder. Using Dummy LLM.")
            return DummyLLMProvider("Please obtain a free API key at https://console.groq.com/keys and set GROQ_API_KEY in .env.")

    # xAI Grok (Elon Musk / xAI)
    if provider in ('grok', 'xai'):
        api_key = os.getenv('GROK_API_KEY') or os.getenv('XAI_API_KEY') or os.getenv('LLM_API_KEY')
        if api_key and not api_key.startswith('your_'):
            return GrokLLMProvider(api_key=api_key)
        else:
            print("WARNING: GROK_API_KEY not found or set to placeholder. Using Dummy LLM.")
            return DummyLLMProvider("Please set your GROK_API_KEY in .env to enable Grok AI generation.")

    # Google Gemini
    if provider == 'gemini':
        api_key = os.getenv('LLM_API_KEY') or os.getenv('GEMINI_API_KEY')
        if api_key:
            return GeminiLLMProvider(api_key=api_key)
        else:
            print("WARNING: LLM_API_KEY not found. Using Dummy LLM.")
            return DummyLLMProvider("Please set your GEMINI_API_KEY in .env to enable AI generation.")

    raise ValueError(f"Unknown LLM provider: {provider}")
