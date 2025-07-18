import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { hfApiKey } from "../../config";

export const embeddingsModel = new HuggingFaceInferenceEmbeddings({
    apiKey: hfApiKey,
    model: "sentence-transformers/distiluse-base-multilingual-cased-v2",
});