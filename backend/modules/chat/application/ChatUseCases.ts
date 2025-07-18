import type { ChatUseCases as ChatUseCasesContract } from "../@core-contracts/application/usecases";
import type { Chat } from "../@core-contracts/domain/entities";
import type { Message } from "../@core-contracts/domain/entities";
import type { ChatService } from "../@core-contracts/domain/services.ts";

export class ChatUseCases implements ChatUseCasesContract {
    private chatService: ChatService;
    constructor(
         chatService: ChatService
    ) {
        this.chatService = chatService;
    }

    createNewChat(chat: Chat, message: Message): Promise<Chat> {
        if(!chat || !message){
            throw new Error("Chat and message are required");
        }
        return this.chatService.createNewChat(chat, message);
    }
    appendMessageToChat(chatId: string, message: Message): Promise<void> {
        if(!chatId || !message){
            throw new Error("Chat ID and message are required");
        }
        return this.chatService.appendMessageToChat(chatId, message);
    }
    getChatById(chatId: string): Promise<Chat> {
        if(!chatId){
            throw new Error("Chat ID is required");
        }
        return this.chatService.getChatById(chatId);
    }
    getChatsByParticipant(participantId: string): Promise<Chat[]> {
        return this.chatService.getChatsByParticipant(participantId);
    }
}
