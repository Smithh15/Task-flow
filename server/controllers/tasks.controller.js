import db from "../config/db.js";

// 🔹 Obtener todas las tareas del usuario autenticado
export const getTasks = async (req, res) => {
  try {
    console.log("➡️ Body recibido:", req.body);
console.log("➡️ Usuario autenticado:", req.user);

    const [rows] = await db.execute(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { title, description, status, priority, start_date, due_date } = req.body;
    const userId = req.user.id;

    if (!title || !start_date || !due_date) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    await db.query(
      "INSERT INTO tasks (user_id, title, description, status, priority, start_date, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, title, description, status, priority, start_date, due_date]
    );

    res.status(201).json({ message: "Tarea creada correctamente" });
  } catch (error) {
    console.error("Error en createTask:", error);
    res.status(500).json({ message: "Error al crear la tarea" });
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
