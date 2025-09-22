import type { Chat } from "../domain/entities";
import type { Message } from "../domain/entities";
import type { MessageEmbedding } from "../domain/entities";

export interface ChatUseCases {
    createNewChat(chat: Chat, message: Message): Promise<Chat>;
    appendMessageToChat(chatId: string, message: Message): Promise<{ message: Message; embedding: MessageEmbedding }>;
    query(chatId: string, message: Message): void;
    response(chatId: string, onStream: (chunk: string) => void): Promise<string>;
    getChatById(chatId: string): Promise<Chat>;
    getChatsByParticipant(participantId: string): Promise<Chat[]>;
}
