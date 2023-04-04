import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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
    },
    accountno: {
      type: String,
      required: true,
      unique: true,
    },

    wallet_pin: {
      type: String,

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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
// generating tokens
UserSchema.methods.generateAuthToken = async function () {
  try {
    // console.log("secret", process.env.secret);
    const token = jwt.sign({ _id: this._id.toString() }, process.env.secret, {
      expiresIn: "10h",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    //
    return token;
  } catch (err) {
    console.log(err);
  }
};
export default mongoose.model("user", UserSchema);
