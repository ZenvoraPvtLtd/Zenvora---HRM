import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI is not configured. Database features will be unavailable.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    console.warn("Server will keep running, but database-backed routes may fail until MongoDB is available.");
  }
};
