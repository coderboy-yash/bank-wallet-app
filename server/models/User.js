import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    accountno: {
      type: String,
      required: true,
      unique: true,
    },

    wallet_pin: {
      type: String,
      minlength: 5,

      required: true,
    },
    initial_deposit: {
      type: Number,
      required: true,
    },
    withdrawal: {
      type: [],
    },
    deposit: {
      type: [],
    },
    balance: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("user", UserSchema);
