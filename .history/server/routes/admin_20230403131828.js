import express from "express";
import { getUser } from "../controllers/admin";

const router = express.Router();
router.get("/getuser", getUser);
