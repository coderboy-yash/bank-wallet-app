import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import { logger } from "./logs/logger.js";
const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to Mongodb");
  } catch (err) {
    console.log("mongoose connnection failed", err);
  }
};
// middlleware
app.use(express.json());
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(8000, () => {
  connect();
  logger.info;
  console.log("connected to backend");
});
