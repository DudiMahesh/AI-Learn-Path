class LLMProvider:
    def generate(self, messages: list[dict], max_tokens: int = 1000) -> str:
        raise NotImplementedError
