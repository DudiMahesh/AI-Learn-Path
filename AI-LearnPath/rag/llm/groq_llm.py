import os
import logging
import requests
from .llm_interface import LLMProvider

logger = logging.getLogger(__name__)

CANDIDATE_GROQ_MODELS = [
    'openai/gpt-oss-120b',
    'qwen/qwen3.8-27b',
    'openai/gpt-oss-20b',
    'allam-2-7b',
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768',
]

class GroqLLMProvider(LLMProvider):
    """
    Groq Cloud LLM Provider implementation using Groq's high-speed OpenAI-compatible REST endpoint.
    Endpoint: https://api.groq.com/openai/v1/chat/completions
    """
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("API key is required for Groq LLM")
        self.api_key = api_key.strip()
        self.base_url = os.getenv('GROQ_BASE_URL', 'https://api.groq.com/openai/v1/chat/completions')

        env_model = os.getenv('GROK_MODEL') or os.getenv('GROQ_MODEL') or os.getenv('LLM_MODEL')
        if env_model and env_model in CANDIDATE_GROQ_MODELS:
            self.candidate_models = [env_model] + [m for m in CANDIDATE_GROQ_MODELS if m != env_model]
        elif env_model and not env_model.startswith('gemini') and not env_model.startswith('grok'):
            self.candidate_models = [env_model] + CANDIDATE_GROQ_MODELS
        else:
            self.candidate_models = CANDIDATE_GROQ_MODELS

    def generate(self, messages: list[dict], max_tokens: int = None) -> str:
        """
        Sends messages to Groq Cloud API and extracts the generated response.
        Caps tokens dynamically to fit Groq Free/On-Demand Tier TPM limits (8,000 TPM total).
        """
        if max_tokens is None:
            try:
                max_tokens = int(os.getenv('LLM_MAX_TOKENS', '2500'))
            except (ValueError, TypeError):
                max_tokens = 2500
        else:
            # On Groq on-demand tier, TPM limit is 7000-8000 total (prompt + output).
            # Cap max_tokens to 2800 so the sum never triggers HTTP 413.
            max_tokens = min(max_tokens, 2800)

        formatted_messages = []
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
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
                "temperature": 0.85,
                "presence_penalty": 0.35,
                "frequency_penalty": 0.2
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
                        msg = choices[0]["message"]
                        text = msg.get("content") or msg.get("reasoning") or ""
                        if text:
                            return text
                elif response.status_code == 413 or (response.status_code == 400 and "reduce the length" in response.text):
                    # Token limit exceeded: condense messages to just system + current query and lower max_tokens
                    logger.warning(f"Groq model {model_name} hit TPM/length limit. Retrying with condensed history...")
                    condensed_msgs = [formatted_messages[0], formatted_messages[-1]] if len(formatted_messages) > 1 else formatted_messages
                    retry_payload = {
                        "model": model_name,
                        "messages": condensed_msgs,
                        "max_tokens": 1200,
                        "temperature": 0.85,
                        "presence_penalty": 0.35,
                        "frequency_penalty": 0.2
                    }
                    try:
                        retry_res = requests.post(self.base_url, headers=headers, json=retry_payload, timeout=30)
                        if retry_res.status_code == 200:
                            data = retry_res.json()
                            choices = data.get("choices", [])
                            if choices and "message" in choices[0]:
                                msg = choices[0]["message"]
                                text = msg.get("content") or msg.get("reasoning") or ""
                                if text:
                                    return text
                    except Exception as retry_err:
                        logger.warning(f"Groq retry error: {retry_err}")
                    last_error = response.text
                    continue
                elif response.status_code == 401:
                    logger.error(f"Groq API authentication failed: {response.text}")
                    return "Groq authentication failed. Please obtain your free API key at https://console.groq.com/keys and set GROQ_API_KEY in .env."
                else:
                    logger.warning(f"Groq model {model_name} returned status {response.status_code}: {response.text}. Trying next fallback...")
                    last_error = response.text
                    continue
            except Exception as e:
                last_error = e
                logger.warning(f"Groq model {model_name} error: {e}. Trying next fallback...")
                continue

        logger.error(f"All Groq models failed. Last error: {last_error}")
        return "I apologize, but I am currently unable to reach Groq Cloud. Please verify your GROQ_API_KEY from https://console.groq.com/keys."

