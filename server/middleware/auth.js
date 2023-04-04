import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.secret);
    console.log(verifyUser);
    const user = await User.findOne({ _id: verifyUser._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
