import User from "../models/User.js";

export const transaction = async (req, res, next) => {
  const sender_account = req.body.sender_account || "";
  const reciever_account = req.body.reciever_account || "";
  const pin = req.body.pin;
  const amount = req.body.amount;
  const sender = await User.find({ accountno: sender_account });
  const reciever = await User.find({ accountno: reciever_account });
};
