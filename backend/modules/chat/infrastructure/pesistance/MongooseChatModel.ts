import mongoose, { Schema, model, Document } from "mongoose";

export interface Chat extends Document {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  participants: string[];
  context?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<Chat>({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: false },
  participants: { type: [String], required: true },
  context: { type: [String], required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const ChatModel =
  mongoose.models.Chat || model<Chat>("Chat", chatSchema);
