import db from "../config/db.js";

// 📘 Obtener todas las tareas
export const getTasks = (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// ➕ Crear nueva tarea
export const createTask = (req, res) => {
  const { title, description, status, priority, start_date, due_date } = req.body;

  const query = `
    INSERT INTO tasks (title, description, status, priority, start_date, due_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [title, description, status, priority, start_date, due_date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tarea creada correctamente", id: result.insertId });
  });
};

// ✏️ Actualizar tarea existente
export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, start_date, due_date } = req.body;

  const query = `
    UPDATE tasks
    SET title=?, description=?, status=?, priority=?, start_date=?, due_date=?, updated_at=NOW()
    WHERE id=?
  `;

  db.query(query, [title, description, status, priority, start_date, due_date, id], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tarea actualizada correctamente" });
  });
};

// 🗑️ Eliminar tarea
export const deleteTask = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id=?", [id], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tarea eliminada correctamente" });
  });
};
