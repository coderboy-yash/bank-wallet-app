import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const transaction = async (req, res, next) => {
  const sender_account = req.body.sender_account;
  const reciever_account = req.body.reciever_account;
  const pin = req.body.pin;
  const amount = req.body.amount;
  const sender = await User.findOne({ accountno: sender_account });
  const reciever = await User.findOne({ accountno: reciever_account });
  if (!reciever || !sender) return res.send("sender or user ac no is invalid");

  const isPinCorrect = await bcrypt.compare(pin, sender.wallet_pin);
  if (!isPinCorrect) return res.status(201).send("incorrect wallet pin");

  const sender_bal = sender.balance;
  const reciever_bal = reciever.balance;
  if (sender_bal < amount)
    return res.send("insufficient balance to make transaction");

  const new_sender_balance = sender_bal - amount;
  const reciever_balance = reciever_bal - amount;
  const senderId = sender._id;
  const recieverId = reciever._id;
};
