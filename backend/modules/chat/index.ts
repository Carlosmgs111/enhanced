import {
  connectToDatabase,
} from "../shared/infrastructure/config/databases";
connectToDatabase();
import { ChatService } from "./domain/services/ChatService";
import { ChatUseCases } from "./application/ChatUseCases";
import { MongooseChatRepository } from "./infrastructure/pesistance/MongooseChatRepository";
import { MongooseMessageRepository } from "./infrastructure/pesistance/MongooseMessageRepository";
import { HFEmbeddingGenerator } from "./infrastructure/service/HFEmbeddingGenerator";
import { ChromaMessageVectorStore } from "./infrastructure/pesistance/ChromaMessageVectoreStore";

export const chatService = new ChatService(
  new MongooseChatRepository(),
  new MongooseMessageRepository(),
  new HFEmbeddingGenerator(
    "sentence-transformers/distiluse-base-multilingual-cased-v2"
  ),
  new ChromaMessageVectorStore()
);

export const chatUseCases = new ChatUseCases(chatService);
