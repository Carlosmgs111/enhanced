import type { Chat as ChatEntity } from "../../@core-contracts/domain/entities";

export class Chat implements ChatEntity {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  participants: string[];
  context?: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    tags: string[] = [],
    participants: string[],
    context: string[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.participants = participants;
    this.context = context;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
