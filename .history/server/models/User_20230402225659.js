import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    initial_deposit: {
      required: true,
      type: Number,
    },
    withdrawals: {
      type: [Number],
    },
    deposits: {
      type: [Number],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("user", UserSchema);
