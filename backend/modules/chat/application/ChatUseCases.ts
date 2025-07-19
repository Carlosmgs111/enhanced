import type { ChatUseCases as ChatUseCasesContract } from "../@core-contracts/application/usecases";
import type { Chat } from "../@core-contracts/domain/entities";
import type { Message } from "../@core-contracts/domain/entities";
import type { ChatService } from "../@core-contracts/domain/services.ts";
// import { ChatAgent } from "../../AI";
import type { MessageEmbedding } from "../@core-contracts/domain/entities";
import type { VectorStore } from "../@core-contracts/domain/repositories.ts";
import { AgentUseCases } from "../../AI/application/AgentUseCases";
const agentUseCases = new AgentUseCases();

// const agent = ChatAgent.getInstance();

export class ChatUseCases implements ChatUseCasesContract {
  private chatService: ChatService;
  private vectorStore: VectorStore;
  constructor(chatService: ChatService, vectorStore: VectorStore) {
    this.chatService = chatService;
    this.vectorStore = vectorStore;
  }

  createNewChat(chat: Chat, message: Message): Promise<Chat> {
    if (!chat || !message) {
      throw new Error("Chat and message are required");
    }
    return this.chatService.createNewChat(chat, message);
  }
  appendMessageToChat(
    chatId: string,
    message: Message
  ): Promise<{ message: Message; embedding: MessageEmbedding }> {
    if (!chatId || !message) {
      throw new Error("Chat ID and message are required");
    }
    return this.chatService.appendMessageToChat(chatId, message);
  }
  async query(chatId: string, message: Message): Promise<boolean> {
    try {
      const { message: newMessage, embedding: newEmbedding } =
        await this.appendMessageToChat(chatId, message);
      const searchResults: any = await this.vectorStore.search(newEmbedding);
      console.log({ searchResults });
      const context = searchResults.join("\n");
      const prompt: any = `
    ---
    Genenera una respuesta acorde al siguiente contexto:
    ${context}
    ---
    ${message.content}
    ---
    `;
      console.log({ prompt });
      return await agentUseCases.askToAgent(chatId, prompt);
    } catch (error) {
      console.log(error);
      throw new Error("Error querying");
    }
  }
  async response(
    chatId: string,
    onStream: (chunk: string) => void
  ): Promise<void> {
    try {
      if (!chatId) {
        throw new Error("Chat ID is required");
      }

      agentUseCases.getResponseFromAgent(chatId, onStream);
      // agent.askAI(prompt);
    } catch (error) {
      console.log(error);
      throw new Error("Error asking to agent");
    }
  }
  getChatById(chatId: string): Promise<Chat> {
    if (!chatId) {
      throw new Error("Chat ID is required");
    }
    return this.chatService.getChatById(chatId);
  }
  getChatsByParticipant(participantId: string): Promise<Chat[]> {
    return this.chatService.getChatsByParticipant(participantId);
  }
}
