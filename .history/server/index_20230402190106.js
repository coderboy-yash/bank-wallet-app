import exress from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const connect =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
    }
}
