import type { EmbeddingsGenerator } from "../../@core-contracts/domain/services";
import { embeddingsModel } from "../../../shared/infrastructure/config/services";

export class MistralEmbeddingGenerator implements EmbeddingsGenerator {
  private modelName: string;
  constructor(modelName: string) {
    this.modelName = modelName;
  }
  async generateEmbedding(content: string): Promise<number[]> {
    try {
      const result = await embeddingsModel.doEmbed({values:[content]});
      return result.embeddings[0];
    } catch (error) {
      console.error("Error generating Mistral embedding", error as Error);
      throw error;
    }
  }
  async generateEmbeddings(contents: string[]): Promise<number[][]> {
    try {
      const result = await embeddingsModel.doEmbed({values:contents});
      return result.embeddings;
    } catch (error) {
      console.error("Error generating Mistral embeddings", error as Error);
      throw error;
    }
  }
  getModel(): string {
    return this.modelName;
  }
}
