import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  recoverPassword,
} from "../controllers/users.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/recover", recoverPassword);

export default router;