// utils/config/db.js
import mongoose from "mongoose";

export const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Database connection error:", err);
  }
};
