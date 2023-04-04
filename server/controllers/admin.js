import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const getUser = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    isAdmin: true,
  });
  if (!user) {
    res.status(201).send("admin not found");
    return;
  }
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) return res.status(201).send("incorrect password");

  const users = await User.find();

  // res.send(users);
  let userobj = [];
  for (let i = 0; i < users.length; i++) {
    const person = {
      username: users[i].username,
      account_no: users[i].accountno,
      balance: users[i].balance,
      initial_deposit: users[i].initial_deposit,
      money_recieved: users[i].deposit,
      money_send: users[i].withdrawal,
    };
    userobj.push(person);
  }
  res.send(userobj);
};
