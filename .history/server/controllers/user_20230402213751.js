import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log("register");
    const newUser = new User({
      username: req.body.username.trim(),
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user has been registered");
  } catch (err) {
    res.status(500).send("unable to register");
    console.log(err);
  }
};
