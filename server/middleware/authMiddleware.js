import db from "../config/db.js";

export const getTasks = async (req, res) => {
  try {
    console.log("🟡 Entrando a getTasks...");
    console.log("➡️ req.user recibido:", req.user);

    if (!req.user || !req.user.id) {
      console.error("❌ req.user está vacío o sin id");
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const userId = req.user.id;
    console.log("✅ userId:", userId);

    // 👇 Esta consulta funciona con mysql2/promise
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
      [userId]
    );

    console.log(`✅ ${tasks.length} tareas encontradas para user ${userId}`);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error al obtener tareas:", error);
    res.status(500).json({
      message: "Error al obtener tareas",
      error: error.message,
    });
  }
};