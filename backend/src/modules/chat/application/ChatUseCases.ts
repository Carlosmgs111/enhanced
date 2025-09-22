import type { ChatUseCases as ChatUseCasesContract } from "../@core-contracts/application/usecases";
import type { Chat } from "../@core-contracts/domain/entities";
import type { Message } from "../@core-contracts/domain/entities";
import type { ChatService } from "../@core-contracts/domain/services";
// import { ChatAgent } from "../../AI";
import type { MessageEmbedding } from "../@core-contracts/domain/entities";
import type { VectorStore } from "../@core-contracts/domain/repositories";
import { AgentUseCases } from "../../AI/application/AgentUseCases";
import { v4 as uuid } from "uuid";
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
    <context>
    ${context}
    </context>
    <question>
    ${message.content}
    </question>
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
  ): Promise<string> {
    try {
      if (!chatId) {
        throw new Error("Chat ID is required");
      }
      const response = await agentUseCases.getResponseFromAgent(
        chatId,
        onStream
      );

      // console.log({ response });

      const agentId = uuid()
      this.appendMessageToChat(chatId, {
        chatId,
        content: response,
        id: uuid(),
        timestamp: new Date(),
        sender: `agent:${agentId}`,
      });
      return response;
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
