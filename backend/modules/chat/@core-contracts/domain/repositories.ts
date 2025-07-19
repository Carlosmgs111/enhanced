import type { Chat } from "./entities";
import type { Message } from "./entities";
import type { MessageEmbedding } from "./entities";

export interface ChatRepository {
  createChat(chat: Chat): Promise<Chat>;
  getChatById(id: string): Promise<Chat | null>;
  getChatsByParticipant(participant: string): Promise<Chat[]>;
  updateChat(chat: Chat): Promise<Chat>;
  deleteChat(id: string): Promise<void>;
}

export interface MessageRepository {
  createMessage(message: Message): Promise<Message>;
  getMessageById(id: string): Promise<Message | null>;
  getMessagesByChat(chatId: string): Promise<Message[]>;
  updateMessage(message: Message): Promise<Message>;
  deleteMessage(id: string): Promise<void>;
}

export interface VectorStore {
  save(embedding: MessageEmbedding): Promise<void>;
  search(embeddings: MessageEmbedding): Promise<(string | null)[]>;
}
