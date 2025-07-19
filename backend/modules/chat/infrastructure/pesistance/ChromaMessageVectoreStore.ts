import type { MessageEmbedding } from "../../@core-contracts/domain/entities";
import type { VectorStore } from "../../@core-contracts/domain/repositories";
import { chromaClient } from "../../../shared/infrastructure/config/databases";
import type { Collection } from "chromadb";

export class ChromaMessageVectorStore implements VectorStore {
  chromaMessageVectorStore: Collection | undefined;
  constructor() {
    (async () => {
      console.log("Connecting to vector database");
      this.chromaMessageVectorStore = await chromaClient.getOrCreateCollection({
        name: "message_vector",
      });
    })();
  }

  async save(embedding: MessageEmbedding) {
    if (!this.chromaMessageVectorStore) {
      throw new Error("ChromaMessageVectorStore not initialized");
    }
    await this.chromaMessageVectorStore.upsert({
      ids: [embedding.id],
      embeddings: [embedding.vector],
      documents: [embedding.document],
      metadatas: [{ id: embedding.id }],
    });
  }
  async search(embeddings: MessageEmbedding) {
    if (!this.chromaMessageVectorStore) {
      throw new Error("ChromaMessageVectorStore not initialized");
    }
    const results = await this.chromaMessageVectorStore.query({
      queryEmbeddings: [embeddings.vector],
      nResults: 5,
      include: ["metadatas", "documents", "distances", "embeddings"],
    });
    return results.documents[0];
  }
}
