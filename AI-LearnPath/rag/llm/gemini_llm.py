import os
import logging
from .llm_interface import LLMProvider

logger = logging.getLogger(__name__)

CANDIDATE_MODELS = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash',
    'gemini-flash-latest',
]

class GeminiLLMProvider(LLMProvider):
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("API key is required for Gemini LLM")
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            self.genai = genai
        except ImportError:
            self.genai = None

        env_model = os.getenv('GEMINI_MODEL') or os.getenv('LLM_MODEL')
        if env_model:
            self.candidate_models = [env_model] + [m for m in CANDIDATE_MODELS if m != env_model]
        else:
            self.candidate_models = CANDIDATE_MODELS
        
    def generate(self, messages: list[dict], max_tokens: int = 1500) -> str:
        # Format messages for Gemini API
        system_instruction = ""
        gemini_messages = []
        
        for msg in messages:
            role = msg.get("role")
            content = msg.get("content", "")
            
            if role == "system":
                system_instruction += content + "\n"
            elif role == "user":
                gemini_messages.append({"role": "user", "parts": [content]})
            elif role == "assistant" or role == "model":
                gemini_messages.append({"role": "model", "parts": [content]})
        
        if not gemini_messages:
            gemini_messages.append({"role": "user", "parts": ["Hello"]})
            
        if system_instruction and gemini_messages:
            gemini_messages[0]["parts"][0] = f"System Instructions:\n{system_instruction}\n\n" + gemini_messages[0]["parts"][0]

        if not self.genai:
            return "Gemini library is currently initializing. Please try again in a moment."

        last_error = None
        for model_name in self.candidate_models:
            try:
                model = self.genai.GenerativeModel(model_name)
                response = model.generate_content(
                    gemini_messages,
                    generation_config=self.genai.types.GenerationConfig(
                        max_output_tokens=max_tokens,
                        temperature=0.7,
                    )
                )
                if response and response.text:
                    return response.text
            except Exception as e:
                last_error = e
                logger.warning(f"Gemini model {model_name} failed: {e}. Trying next fallback...")
                continue
                
        logger.error(f"All Gemini models failed. Last error: {last_error}")
        return "I apologize, but I am currently unable to generate an AI response. Please check your Gemini API key or internet connection."
