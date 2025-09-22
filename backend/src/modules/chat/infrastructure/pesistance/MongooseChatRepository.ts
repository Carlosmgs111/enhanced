import type { Chat as ChatEntity } from "../../@core-contracts/domain/entities";
import type { ChatRepository } from "../../@core-contracts/domain/repositories";
import { ChatModel } from "./MongooseChatModel";

export class MongooseChatRepository implements ChatRepository {
  async createChat(chat: ChatEntity): Promise<ChatEntity> {
    return await ChatModel.create(chat);
  }
  
  async getChatById(id: string): Promise<ChatEntity | null> {
    return ChatModel.findOne({ id });
  }

  async getChatsByParticipant(participant: string): Promise<ChatEntity[]> {
    return ChatModel.find({ participants: participant });
  }

  async updateChat(chat: ChatEntity): Promise<ChatEntity> {
    return ChatModel.updateOne({ id: chat.id }, chat).then(() => chat);
  }

  async deleteChat(id: string): Promise<void> {
    return ChatModel.deleteOne({ id }).then(() => {});
  }
}
