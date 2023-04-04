import express from "express";
import { login, register } from "../controllers/user.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/transaction", transaction);
export default router;
