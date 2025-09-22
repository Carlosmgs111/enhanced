import type { Agent } from "./entities";

export interface AgentRepository {
    saveAgent(agent: Agent): Promise<Agent>;
    getAgentById(id: string): Promise<Agent>;
    getAgents(): Promise<Agent[]>;
    updateAgent(id: string, agent: Agent): Promise<Agent>;
    deleteAgent(id: string): Promise<void>;
}