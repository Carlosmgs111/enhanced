export interface Chat {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  participants: string[];
  context?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: Date;
  sender: `user:${string}` | `agent:${string}`;
}

export interface MessageEmbedding {
    id: string;
    vector: number[];
    model: string;
    document: string;
}