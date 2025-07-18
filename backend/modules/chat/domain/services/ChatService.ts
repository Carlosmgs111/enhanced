import type {
  ChatRepository,
  MessageRepository,
  VectorStore,
} from "../../@core-contracts/domain/repositories";
import type { EmbeddingsGenerator } from "../../@core-contracts/domain/services";
import type { Message as MessageEntity } from "../../@core-contracts/domain/entities";
import type { ChatService as ChatServiceContract } from "../../@core-contracts/domain/services";
import { Chat } from "../../domain/entities/Chat";
import { Message } from "../../domain/entities/Message";
import { MessageEmbedding } from "../../domain/entities/MessageEmbedding";

export class ChatService implements ChatServiceContract {
  chatRepository: ChatRepository;
  messageRepository: MessageRepository;
  embeddingsGenerator: EmbeddingsGenerator;
  vectorStore: VectorStore;

  constructor(
    chatRepository: ChatRepository,
    messageRepository: MessageRepository,
    embeddingsGenerator: EmbeddingsGenerator,
    vectorStore: VectorStore
  ) {
    this.chatRepository = chatRepository;
    this.messageRepository = messageRepository;
    this.embeddingsGenerator = embeddingsGenerator;
    this.vectorStore = vectorStore;
  }

  createNewChat = async (chat: Chat, message: MessageEntity) => {
    try {
      const newMessage = new Message(
        message.id,
        chat.id,
        message.content,
        message.timestamp,
        message.sender
      );
      await this.messageRepository.createMessage(newMessage);
      const newChat = new Chat(
        chat.id,
        chat.name,
        chat.description,
        chat.tags,
        chat.participants,
        chat.context
      );
      return await this.chatRepository.createChat(newChat);
    } catch (error: any) {
      console.error("[ChatService] - Failed to create chat");
      throw new Error("[ChatService] - Failed to create chat");
    }
  };

  getChatById = async (id: string) => {
    const chat = await this.chatRepository.getChatById(id);
    if (!chat) {
      throw new Error("Chat not found");
    }
    return chat;
  };

  getChatsByParticipant = async (participant: string) => {
    const chats = await this.chatRepository.getChatsByParticipant(participant);
    if (!chats) {
      throw new Error("Chats not found");
    }
    return chats;
  };

  appendMessageToChat = async (
    chatId: string,
    message: Omit<MessageEntity, "chatId">
  ): Promise<void> => {
    const chat = await this.chatRepository.getChatById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }
    const newMessage = new Message(
      message.id,
      chatId,
      message.content,
      message.timestamp,
      message.sender
    );
    const embedding = await this.embeddingsGenerator.generateEmbedding(
      message.content
    );
    const newEmbedding = new MessageEmbedding(
      message.id,
      embedding,
      this.embeddingsGenerator.getModel()
    );
    await this.vectorStore.save(newEmbedding);
    await this.messageRepository.createMessage(newMessage);
  };

  updateChat = async (chat: Chat) => {
    const updatedChat = new Chat(
      chat.id,
      chat.name,
      chat.description,
      chat.tags,
      chat.participants,
      chat.context
    );
    return await this.chatRepository.updateChat(updatedChat);
  };

  deleteChat = async (id: string) => {
    return await this.chatRepository.deleteChat(id);
  };
}
