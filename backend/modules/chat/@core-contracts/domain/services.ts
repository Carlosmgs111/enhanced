import type { Chat } from "./entities";
import type { Message } from "./entities";

export interface ChatService {
    createNewChat(chat: Chat, message: Message): Promise<Chat>;
    appendMessageToChat(chatId: string, message: Omit<Message, "chatId">): Promise<void>;
    getChatById(chatId: string): Promise<Chat>;
    getChatsByParticipant(participantId: string): Promise<Chat[]>;
    updateChat(chat: Chat): Promise<Chat>;
    deleteChat(id: string): Promise<void>;
}

export interface EmbeddingsGenerator {
    generateEmbedding(content: string): Promise<number[]>;
    generateEmbeddings(contents: string[]): Promise<number[][]>;
    getModel(): string;
}
  