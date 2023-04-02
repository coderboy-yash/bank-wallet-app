import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
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

app.listen(8000, () => {
  connect();
  console.log("connected to backend");
});
