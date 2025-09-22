import mongoose, { Schema, model, Document } from "mongoose";

export interface Message extends Document {
  id: string;
  chatId: string;
  content: string;
  timestamp: Date;
  sender: `user:${string}` | `agent:${string}`;
}

const messageSchema = new Schema({
  id: { type: String, unique: true, required: true },
  chatId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sender: { type: String, required: true },
});


export const MessageModel = mongoose.models.Message || model("Message", messageSchema);
