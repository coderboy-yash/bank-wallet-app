import User from "../models/User.js";
export const getuser = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};
