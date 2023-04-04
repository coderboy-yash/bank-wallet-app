import User from "../models/User.js";
export const getUser = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
  let userobj = [];
  let obj = {
    name: "",
    email: "",
    accountNo: "",
    balance: 0,
  };
};
