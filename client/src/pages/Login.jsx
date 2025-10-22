import React, { useState } from "react";
import api from "../../utils/api";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/users/login", form);
    localStorage.setItem("token", res.data.token);
    showToast("✅ Sesión iniciada correctamente", "success");
    setTimeout(() => navigate("/tasks"), 1000); // 👈 redirige al panel principal
  } catch (err) {
    showToast("Correo o contraseña incorrectos", "error");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toast {...toast} onClose={() => setToast({ message: "", type: "" })} />
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center dark:text-white">
          Iniciar Sesión
        </h2>
        <input
          type="email"
          placeholder="Correo"
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700"
        >
          Entrar
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-500 hover:underline">
            Regístrate
          </a>
        </p>
            <p className="text-sm text-center mt-4 text-gray-400">
           ¿Olvidaste tu contraseña?{" "}
            <a href="/recover" className="text-indigo-400 hover:underline">
          Recuperar
  </a>
</p>
      </form>
    </div>
  );
}
