import os
import json
import logging
import requests
from .llm_interface import LLMProvider

logger = logging.getLogger(__name__)

CANDIDATE_GROK_MODELS = [
    'grok-2-latest',
    'grok-2',
    'grok-beta',
]

class GrokLLMProvider(LLMProvider):
    """
    xAI Grok LLM Provider implementation using the official OpenAI-compatible REST endpoint.
    Endpoint: https://api.x.ai/v1/chat/completions
    """
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("API key is required for Grok LLM")
        self.api_key = api_key.strip()
        self.base_url = os.getenv('GROK_BASE_URL', 'https://api.x.ai/v1/chat/completions')

        env_model = os.getenv('GROK_MODEL') or os.getenv('LLM_MODEL')
        if env_model and env_model in CANDIDATE_GROK_MODELS:
            self.candidate_models = [env_model] + [m for m in CANDIDATE_GROK_MODELS if m != env_model]
        elif env_model and not env_model.startswith('gemini'):
            self.candidate_models = [env_model] + CANDIDATE_GROK_MODELS
        else:
            self.candidate_models = CANDIDATE_GROK_MODELS

    def generate(self, messages: list[dict], max_tokens: int = 1500) -> str:
        """
        Sends messages to xAI Grok completions API and extracts model answer.
        """
        # Format messages into standard OpenAI chat format
        formatted_messages = []
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            # Normalize role names
            if role in ("assistant", "model"):
                role = "assistant"
            elif role == "system":
                role = "system"
            else:
                role = "user"

            formatted_messages.append({"role": role, "content": str(content)})

        if not formatted_messages:
            formatted_messages.append({"role": "user", "content": "Hello"})

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        last_error = None
        for model_name in self.candidate_models:
            payload = {
                "model": model_name,
                "messages": formatted_messages,
                "max_tokens": max_tokens,
                "temperature": 0.7
            }
            try:
                response = requests.post(
                    self.base_url,
                    headers=headers,
                    json=payload,
                    timeout=30
                )
                if response.status_code == 200:
                    data = response.json()
                    choices = data.get("choices", [])
                    if choices and "message" in choices[0]:
                        return choices[0]["message"].get("content", "")
                elif response.status_code == 401:
                    logger.error(f"Grok API authentication failed: {response.text}")
                    return "Grok authentication failed. Please verify your xAI / GROK_API_KEY in .env."
                else:
                    logger.warning(f"Grok model {model_name} returned status {response.status_code}: {response.text}. Trying next fallback...")
                    last_error = response.text
                    continue
            except Exception as e:
                last_error = e
                logger.warning(f"Grok model {model_name} network error: {e}. Trying next fallback...")
                continue

        logger.error(f"All Grok models failed. Last error: {last_error}")
        return "I apologize, but I am currently unable to reach xAI Grok. Please verify your GROK_API_KEY or internet connection."

