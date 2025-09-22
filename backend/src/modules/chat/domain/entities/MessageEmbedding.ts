import type { MessageEmbedding as MessageEmbeddingEntity } from "../../@core-contracts/domain/entities";

export class MessageEmbedding implements MessageEmbeddingEntity {
  id: string;
  vector: number[];
  model: string;
  document: string;

  constructor(id: string, vector: number[], model: string, document: string) {
    this.id = id;
    this.vector = vector;
    this.model = model;
    this.document = document;
  }
}
