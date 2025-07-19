import type { Agent as AgentEntity } from "../../@core-contracts/domain/entities";

export class Agent implements AgentEntity {
  id: string;
  name: string;
  description: string;
  model: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];

  constructor(
    id: string,
    name: string,
    description: string,
    model: string,
    createdAt: Date,
    updatedAt: Date,
    tags?: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.model = model;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
