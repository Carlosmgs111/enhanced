const { createMistral } = await import("@ai-sdk/mistral");
const { createGroq } = await import("@ai-sdk/groq");

export const embeddingsModel = createMistral({
  apiKey: import.meta.env.MISTRAL_API_KEY,
}).textEmbeddingModel("mistral-embed");

export const model = createGroq({ apiKey: import.meta.env.GROQ_API_KEY }).languageModel(
  "deepseek-r1-distill-llama-70b"
);
