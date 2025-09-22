export interface Agent {
    id: string;
    name: string;
    description: string;
    tags?: string[];
    model: string;
    createdAt: Date;
    updatedAt: Date;
}