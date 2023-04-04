import User from "../models/User";
export const getUser = async (req, res, next) => {
  const users = await User.find();
};
