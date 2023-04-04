import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const salt_pin = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const pin = bcrypt.hashSync(req.body.pin, salt_pin);
    const acc = Math.floor(Math.random() * 10000000000);
    const isAdmin = req.body.isAdmin || false;
    console.log(isAdmin);

    if (isAdmin) {
      const admin = await User.findOne({ isAdmin: isAdmin });
      if (admin)
        return res.send(
          "you cannot register as an admin, admin is already registered"
        );
    }

    console.log("register");
    const newUser = new User({
      username: req.body.username.trim(),
      email: req.body.email,
      password: hash,
      accountno: acc,
      wallet_pin: pin,
      initial_deposit: req.body.initial_deposit,
      // deposit: req.body.initial_deposit,
      balance: req.body.initial_deposit,
      isAdmin: isAdmin,
    });
    // token
    const token = await newUser.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true,
    });
    console.log(token, "from register");

    await newUser.save();
    res.status(200).send("user has been registered");
  } catch (err) {
    res.status(500).send("unable to register");
    console.log(err);
  }
};
export const login = async (req, res) => {
  try {
    // console.log("body", req.body.email);
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

    // generate token
    const token = await user.generateAuthToken();
    console.log(token, "from login");
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
    });
    // console.log("cookie", req.cookies.jwt);

    // console.log(cookie);
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

export const logout = (req, res) => {
  try {
  } catch (err) {}
};
