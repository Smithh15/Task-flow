// 🔹 Obtener tareas del usuario
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

// 🔹 Obtener una tarea específica
export const getTaskById = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [req.params.id, req.user.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Crear tarea
export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status, priority, start_date, due_date } = req.body;

    const [result] = await db.query(
      "INSERT INTO tasks (user_id, title, description, status, priority, start_date, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, title, description, status, priority, start_date, due_date]
    );

    res.status(201).json({ message: "Tarea creada", taskId: result.insertId });
  } catch (error) {
    console.error("❌ Error al crear tarea:", error);
    res.status(500).json({ message: "Error al crear tarea", error: error.message });
  }
};

// 🔹 Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, start_date, due_date } = req.body;
    const [result] = await db.execute(
      "UPDATE tasks SET title=?, description=?, priority=?, status=?, start_date=?, due_date=? WHERE id=? AND user_id=?",
      [title, description, priority, status, start_date, due_date, req.params.id, req.user.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });

    res.json({ message: "Tarea actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM tasks WHERE id=? AND user_id=?",
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


