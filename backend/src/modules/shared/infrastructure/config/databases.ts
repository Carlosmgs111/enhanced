import { mongoUrl } from "../../config";
import { ChromaClient } from "chromadb";
import mongoose from "mongoose";

export const chromaClient = new ChromaClient({
  host: "127.0.0.1",
  port: 8000,
  
});

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl.replace("{databasename}", "enhanced"));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
