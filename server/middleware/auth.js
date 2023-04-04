import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.secret);
    console.log(verifyUser);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
