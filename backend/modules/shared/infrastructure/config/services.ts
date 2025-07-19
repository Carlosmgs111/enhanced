import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { hfApiKey } from "../../config";
import { ChatGroq } from "@langchain/groq";

export const embeddingsModel = new HuggingFaceInferenceEmbeddings({
    apiKey: hfApiKey,
    model: "Qwen/Qwen3-Embedding-8B",
});

export const chatAgent = new ChatGroq({
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: import.meta.env.GROQ_API_KEY,
    streaming: true,
});