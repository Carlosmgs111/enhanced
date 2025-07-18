import type { Chat } from "../domain/entities";
import type { Message } from "../domain/entities";

export interface ChatUseCases {
    createNewChat(chat: Chat, message: Message): Promise<Chat>;
    appendMessageToChat(chatId: string, message: Message): Promise<void>;
    getChatById(chatId: string): Promise<Chat>;
    getChatsByParticipant(participantId: string): Promise<Chat[]>;
}
