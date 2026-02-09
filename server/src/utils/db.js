import mongoose from "mongoose";
import { ENV } from "./env.js";

const URI = ENV.MONGO_URI;

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(URI);
    console.log("Connected to mongoDB successfully.");
  } catch (error) {
    console.log("Error while connecting to mongoDB", error);
  }
};
