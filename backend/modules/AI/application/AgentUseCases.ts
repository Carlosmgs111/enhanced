import type { AgentUseCases as AgentUseCasesContract } from "../@core-contracts/application/useCases";
import type { Agent } from "../@core-contracts/domain/entities";
import type { AgentRepository } from "../@core-contracts/domain/repositories";
import { model } from "../../shared/infrastructure/config/services";
import { streamText } from "ai";

export class AgentUseCases implements AgentUseCasesContract {
  // private agentRepository: AgentRepository;
  messages: Record<string, string> = {};
  constructor() {
    // agentRepository: AgentRepository
    // this.agentRepository = agentRepository;
  }
  async askToAgent(chatId: string, message: string): Promise<boolean> {
    this.messages[chatId] = message;
    return true;
  }
  async getResponseFromAgent(
    chatId: string,
    // message: string,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    console.log({ messages: this.messages, chatId });

    let response = "";
    if (!this.messages[chatId]) {
      throw new Error("Message is required");
    }
    const { fullStream } = await streamText({
      model,
      prompt: this.messages[chatId],
    });
    console.log({ fullStream });
    for await (const chunk of fullStream) {
      if(chunk.type === "text-delta"){
        response += chunk.textDelta;
        if (onStream) onStream(chunk.textDelta);
      }
    }
    return response;
  }
  createAgent(agent: Agent): Promise<Agent> {
    throw new Error("Method not implemented.");
  }
  getAgentById(id: string): Promise<Agent> {
    throw new Error("Method not implemented.");
  }
  getAgents(): Promise<Agent[]> {
    throw new Error("Method not implemented.");
  }
  updateAgent(id: string, agent: Agent): Promise<Agent> {
    throw new Error("Method not implemented.");
  }
  deleteAgent(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
