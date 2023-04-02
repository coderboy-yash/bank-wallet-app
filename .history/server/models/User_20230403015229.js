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
      minlength: 8,
      maxlength: 1024,
    },
    accountno: {
      type: String,
      required: true,
    },
    // wallet_id: {
    //   type: Number,
    //   //   required: true,
    // },
    wallet_pin: {
      type: Number,
      minlength: 5,
      maxlength: 5,
      required: true,
    },
    initial_deposit: {
      type: Number,
      required: true,
    },
    withdrawal: {
      type: [Number],
    },
    deposit: {
      type: [Number],
    },
  },
  { timestamps: true }
);
export default mongoose.model("user", UserSchema);
