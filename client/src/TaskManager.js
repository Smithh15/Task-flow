import React, { useState, useEffect } from "react";
import api from "../utils/api";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pendiente",
    priority: "media",
    start_date: "",
    due_date: "",
  });
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 🟢 Estado del toast visual
  const [toast, setToast] = useState({ message: "", type: "" });

  
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
}, []);


  // 🔹 Obtener tareas
 const fetchTasks = async () => {
  try {
    const res = await api.get("/tasks");
    setTasks(res.data);
  } catch (error) {
    showToast("Error al obtener tareas", "error");
  }
};

  // 🔹 Mostrar toast elegante
  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

    const createTask = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/tasks", form);
    console.log("✅ Tarea creada:", res.data);
    showToast("Tarea creada correctamente", "success");
    setForm({
      title: "",
      description: "",
      status: "pendiente",
      priority: "media",
      start_date: "",
      due_date: "",
    });
    fetchTasks();
  } catch (err) {
    console.error("❌ Error al crear tarea:", err.response?.data || err.message);
    showToast("Error al crear tarea", "error");
  }
};

 // 🔹 Guardar edición
const saveEdit = async (e) => {
  e.preventDefault();
  try {
    await api.put(`/tasks/${editTask.id}`, editTask);
    setEditTask(null);
    fetchTasks();
    showToast("✏️ Tarea actualizada correctamente", "success");
  } catch (error) {
    showToast("Error al editar tarea", "error");
  }
};

// 🔹 Eliminar tarea
const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
    showToast("🗑️ Tarea eliminada", "success");
  } catch (error) {
    showToast("Error al eliminar tarea", "error");
  }
};
//cerrar sesion
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirige al login
};


  // 🔹 Modo oscuro
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    fetchTasks();
  }, []);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold animate-pulse">📝 Gestor de Tareas</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 px-4 py-2 rounded-lg shadow hover:scale-105 transition transform"
          >
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>
            <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
           🚪 Cerrar sesión
</button>
        </div>

        {/* TOAST flotante */}
        {toast.message && (
          <div
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium fade-in transition-all duration-500 ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : toast.type === "error"
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        )}

        {/* Formulario */}
        <div
          className={`rounded-xl shadow-2xl p-8 mb-10 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <svg
              className="w-8 h-8 mr-3 text-indigo-500 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Agregar Nueva Tarea
          </h2>

          <form onSubmit={createTask} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Título
                </label>
                <input
                  type="text"
                  placeholder="Título de la tarea"
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Prioridad
                </label>
                <select
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Estado
                </label>
                <select
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En progreso</option>
                  <option value="completada">Completada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Fecha de inicio
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Fecha de finalización
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                  value={form.due_date}
                  min={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, due_date: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Descripción
              </label>
              <textarea
                placeholder="Descripción de la tarea..."
                className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              ➕ Agregar Tarea
            </button>
          </form>
        </div>

        {/* Lista de tareas */}
        <div
          className={`rounded-xl shadow-2xl p-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <svg
              className="w-8 h-8 mr-3 text-green-500 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2"
              />
            </svg>
            Lista de Tareas
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {tasks.length === 0 && (
              <p className="text-center text-gray-600 dark:text-gray-400 col-span-2">
                No hay tareas aún. ¡Crea una nueva!
              </p>
            )}

            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-6 rounded-xl border-l-4 transition transform hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-700 border-indigo-400"
                    : "bg-white border-indigo-500"
                }`}
              >
                <h3 className="text-xl font-semibold mb-1">{task.title}</h3>
                <p className="text-sm mb-2">{task.description}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {task.start_date?.slice(0, 10)} →{" "}
                  {task.due_date?.slice(0, 10)}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === "completada"
                        ? "bg-green-200 text-green-800"
                        : task.status === "en_progreso"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditTask(task)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de edición */}
        {editTask && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div
              className={`p-8 rounded-xl shadow-2xl w-full max-w-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                ✏️ Editar Tarea
              </h2>
              <form onSubmit={saveEdit} className="space-y-4">
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask({ ...editTask, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                />
                <textarea
                  value={editTask.description}
                  onChange={(e) =>
                    setEditTask({ ...editTask, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    💾 Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditTask(null)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
