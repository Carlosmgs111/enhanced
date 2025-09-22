export class Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: Date;
  sender: `user:${string}` | `agent:${string}`;

  constructor(
    id: string,
    chatId: string,
    content: string,
    timestamp: Date,
    sender: `user:${string}` | `agent:${string}`
  ) {
    this.id = id;
    this.chatId = chatId;
    this.content = content;
    this.timestamp = timestamp;
    this.sender = sender;
  }
}
