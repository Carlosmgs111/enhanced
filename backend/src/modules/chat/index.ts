import { connectToDatabase } from "../shared/infrastructure/config/databases";
connectToDatabase();
import { ChatService } from "./domain/services/ChatService";
import { ChatUseCases } from "./application/ChatUseCases";
import { MongooseChatRepository } from "./infrastructure/pesistance/MongooseChatRepository";
import { MongooseMessageRepository } from "./infrastructure/pesistance/MongooseMessageRepository";
import { MistralEmbeddingGenerator } from "./infrastructure/service/MistralEmbeddingGenerator";
import { ChromaMessageVectorStore } from "./infrastructure/pesistance/ChromaMessageVectoreStore";
import { Router } from "./infrastructure/api/Router";

export const chatService = new ChatService(
  new MongooseChatRepository(),
  new MongooseMessageRepository(),
  new MistralEmbeddingGenerator("mistral-embed"),
  new ChromaMessageVectorStore()
);

export const chatUseCases = new ChatUseCases(
  chatService,
  new ChromaMessageVectorStore()
);

export const router = new Router(chatUseCases);