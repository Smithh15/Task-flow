import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/users.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { recoverPassword } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/recover", recoverPassword);

export default router;
