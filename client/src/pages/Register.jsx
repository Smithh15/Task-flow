import React, { useState } from "react";
import api from "../api";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [toast, setToast] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Validar nombre
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)+$/;
  if (!nameRegex.test(form.name)) {
    showToast("⚠️ Ingresa nombre y apellido válidos", "error");
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    showToast("⚠️ Ingresa un correo electrónico válido", "error");
    return;
  }

  // Validar contraseña segura
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z\d]).{8,}$/;
  if (!passRegex.test(form.password)) {
    showToast("⚠️ La contraseña debe tener al menos 8 caracteres, una mayúscula y un número", "error");
    return;
  }


    try {
      await api.post("/users/register", form);
      showToast("✅ Registro exitoso. Inicia sesión.", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      showToast(err.response?.data?.message || "Error al registrar", "error");
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
          Crear cuenta
        </h2>
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          Registrarse
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
