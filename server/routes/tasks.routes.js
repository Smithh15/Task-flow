import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";


import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Aplica authMiddleware a todas las rutas
router.use(authMiddleware);

// Rutas protegidas
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);   // ✅ ahora req.user existe
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;