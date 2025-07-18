import type { EmbeddingsGenerator } from "../../@core-contracts/domain/services";
import { embeddingsModel } from "../../../shared/infrastructure/config/services";

export class HFEmbeddingGenerator implements EmbeddingsGenerator {
  private modelName: string;
  constructor(modelName: string) {
    this.modelName = modelName;
  }
  async generateEmbedding(content: string): Promise<number[]> {
    try {
      const result = await embeddingsModel.embedQuery(content);
      return result;
    } catch (error) {
      console.error("Error generating HuggingFace embedding", error as Error);
      throw error;
    }
  }
  async generateEmbeddings(contents: string[]): Promise<number[][]> {
    try {
      const result = await embeddingsModel.embedDocuments(contents);
      return result;
    } catch (error) {
      console.error("Error generating HuggingFace embeddings", error as Error);
      throw error;
    }
  }
  getModel(): string {
    return this.modelName;
  }
}
