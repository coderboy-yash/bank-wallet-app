import mongoose from "mongoose";
import { UserShema } from "./User.js";
const walletSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  user: {
    type: UserSchema,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  accountBalance: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 24,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);
