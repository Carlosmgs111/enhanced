const { mongoUrl } = await import("../../config");
const { ChromaClient } = await import("chromadb");
const mongoose = await import("mongoose");

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
