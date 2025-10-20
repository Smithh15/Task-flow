import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

// 🟢 MIDDLEWARES
app.use(cors());
app.use(express.json()); // ✅ ESTO DEBE ESTAR ANTES DE LAS RUTAS

// 🟢 RUTAS
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
