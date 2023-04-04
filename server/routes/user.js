import express from "express";
import { login, register,logout } from "../controllers/user.js";
import { transaction } from "../controllers/transaction.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);

router.post("/transaction", auth, transaction);
router.post("/logout",auth,logout)
export default router;