import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
let isConnected = false;
let listenersAdded = false;

const dbConnect = async () => {
  if (!MONGO_URI) {
    console.error("❌ MongoDB URI not found in .env");
    process.exit(1);
  }

  if (isConnected) return;

  const connect = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        bufferCommands: false,
      });
      isConnected = true;
      console.log("✅ Database Connected Successfully");
    } catch (err) {
      console.error("❌ Initial DB connection failed:", err.message);
      console.log("🔁 Retrying in 5 seconds...");
      setTimeout(connect, 5000);
    }
  };

  await connect();

  if (!listenersAdded) {
    listenersAdded = true;

    mongoose.connection.on("error", (err) => {
      console.error("🚨 Mongoose runtime error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Mongoose disconnected. Trying to reconnect...");
      isConnected = false;
      connect();
    });
  }
};

export default dbConnect;
