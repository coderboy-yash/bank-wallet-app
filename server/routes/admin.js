import express from "express";
import { getUser } from "../controllers/admin.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.get("/getuser",auth, getUser);
export default router;
