import { createMistral } from "@ai-sdk/mistral";
import { createGroq } from "@ai-sdk/groq";

export const embeddingsModel = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
}).textEmbeddingModel("mistral-embed");

export const model = createGroq({ apiKey: process.env.GROQ_API_KEY }).languageModel(
  "deepseek-r1-distill-llama-70b"
);
