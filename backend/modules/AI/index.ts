import { ChatGroq } from "@langchain/groq";

export class ChatAgent {
  static instance: ChatAgent;
  chatAgent = new ChatGroq({
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: import.meta.env.GROQ_API_KEY,
    streaming: true,
  });
  question = "";
  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatAgent();
    }
    return this.instance;
  }
  askAI = async (message: string) => {
    this.question = message;
  };
  responseAI = async (onStream: (chunk: any) => void) => {
    console.log("Question:", this.question);
    if (!this.question || this.question.trim() === "" || this.question.length < 10) {
      throw new Error("Question is required");
    }
    for await (const chunk of await this.chatAgent.stream(this.question)) {
      console.log(chunk.content);
      onStream(chunk.content);
    }
  };
}
