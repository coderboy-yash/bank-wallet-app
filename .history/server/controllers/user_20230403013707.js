import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const acc = 1000000 * Math.random();
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
export const login = async (req, res) => {
  try {
    console.log("body", req.body.email);
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(201).send("user not found");
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(201).send("incorrect password");
      return;
    } else {
      res.send(user);
      console.log("logged in successfully");
    }
  } catch (err) {
    console.log(err);
  }
};
