import type { MessageRepository } from "../../@core-contracts/domain/repositories";
import type { Message as MessageEntity } from "../../@core-contracts/domain/entities";
import { MessageModel } from "./MongooseMessageModel";

export class MongooseMessageRepository implements MessageRepository {
    
    async createMessage(message: MessageEntity): Promise<MessageEntity> {
        return MessageModel.create(message);
    }
    
    async getMessageById(id: string): Promise<MessageEntity | null> {
        return MessageModel.findById(id);
    }
    
    async getMessagesByChat(chatId: string): Promise<MessageEntity[]> {
        return MessageModel.find({ chatId });
    }
    
    async updateMessage(message: MessageEntity): Promise<MessageEntity> {
        return MessageModel.updateOne({ id: message.id }, message).then(() => message);
    }
    
    async deleteMessage(id: string): Promise<void> {
        return MessageModel.deleteOne({ id }).then(() => {});  
    }
}
