import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("🧩 Cargando rutas...");

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});