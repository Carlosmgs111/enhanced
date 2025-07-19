import type { Agent } from "../domain/entities";

export interface AgentUseCases {
    createAgent(agent: Agent): Promise<Agent>;
    askToAgent(chatId: string, message: string): void;
    getResponseFromAgent(chatId: string, onStream: (chunk: string) => void): Promise<void>;
    getAgentById(id: string): Promise<Agent>;
    getAgents(): Promise<Agent[]>;
    updateAgent(id: string, agent: Agent): Promise<Agent>;
    deleteAgent(id: string): Promise<void>;
}