import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

// const app = express();
// app.use(cookieParser());
export const transaction = async (req, res, next) => {
  // const token = req.cookies.jwt;
  // console.log("transactioon", req.user);
  // const sender_account = req.user;
  try {
    const reciever_account = req.body.reciever_account;
    const pin = req.body.pin;
    const amount = req.body.amount;
    const sender = await User.findOne({ _id: req.user._id });
    const reciever = await User.findOne({ accountno: reciever_account });
    if (!reciever || !sender)
      return res.send("sender or user ac no is invalid");

    const isPinCorrect = await bcrypt.compare(pin, sender.wallet_pin);
    if (!isPinCorrect) return res.status(201).send("incorrect wallet pin");

    const sender_bal = sender.balance;
    const reciever_bal = reciever.balance;
    if (sender_bal < amount)
      return res.send("insufficient balance to make transaction");

    const new_sender_balance = sender_bal - amount;
    const new_reciever_balance = reciever_bal + amount;
    const senderId = sender._id;
    let senderWithdraw = sender.withdrawal;
    // console.log(sender.deposit.push(99));
    let recieverDeposit = reciever.deposit;
    // console.log("recieverDeposit", recieverDeposit[0]);
    // console.log("senderwithdraw", senderWithdraw[0]);
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    senderWithdraw.push({
      amount: amount,
      send_to: reciever.accountno,
      time: dateTime,
    });

    recieverDeposit.push({
      amount: amount,
      recieved_from: sender.accountno,
      time: dateTime,
    });
    // console.log("recieverDeposit", recieverDeposit);
    // console.log("senderwithdraw", senderWithdraw);

    const updateNewSenderBal = await User.findByIdAndUpdate(
      senderId,
      { balance: new_sender_balance, withdrawal: senderWithdraw },
      {
        new: true,
      }
    );

    const recieverId = reciever._id;
    const updatRecieverBal = await User.findByIdAndUpdate(
      recieverId,
      { balance: new_reciever_balance, deposit: recieverDeposit },
      {
        new: true,
      }
    );
    return res.send("transaction successfully updated");
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
