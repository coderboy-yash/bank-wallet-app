import User from "../models/User.js";

export const transaction = async (req, res, next) => {
  const sender_account = req.body.sender_account || "";
  const reciever_account = req.body.reciever_account || "";
  const pin = req.body.pin;
  const amount = req.body.amount;
  const sender = await User.findOne({ accountno: sender_account });
  const reciever = await User.findOne({ accountno: reciever_account });
  if (!reciever || !sender) {
    res.send("sender or user ac no is invalid");
  } else {
    res.send("both found");
  }
  //   console.log(sender, reciever);
};
