import type { MessageEmbedding as MessageEmbeddingEntity } from "../../@core-contracts/domain/entities";

export class MessageEmbedding implements MessageEmbeddingEntity {
  id: string;
  vector: number[];
  model: string;

  constructor(id: string, vector: number[], model: string) {
    this.id = id;
    this.vector = vector;
    this.model = model;
  }
}
