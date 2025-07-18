import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { mongoUrl } from "../../config";
import { ChromaClient } from "chromadb";

export const chromaClient = new ChromaClient({
  host: "127.0.0.1",
  port: 8000,
});

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl.replace("{databasename}", "enhanced"));
    const client = new MongoClient(
      mongoUrl.replace("{databasename}", "vectordb")
    );
    const db = client.db("vectordb");
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
