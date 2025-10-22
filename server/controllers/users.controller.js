import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// ⚙️ Clave JWT (debería venir del .env en producción)
const JWT_SECRET = process.env.JWT_SECRET || "miclavesupersegura";

// ======================================================
// ✅ REGISTRO DE USUARIO
// ======================================================
export const registerUser = async (req, res) => {
  try {
    console.log("📩 Datos recibidos en /register:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // 🔍 Verificar si el correo ya está registrado
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // 🔐 Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧩 Insertar nuevo usuario
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // 🔑 Generar token JWT
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    // ✅ Respuesta exitosa
    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { name, email },
      token,
    });
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    return res.status(500).json({
      message: "Error en el servidor al registrar usuario",
      error: error.message,
    });
  }
};

// ======================================================
// ✅ LOGIN DE USUARIO
// ======================================================
export const loginUser = async (req, res) => {
  try {
    console.log("🔐 Intentando iniciar sesión:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos" });
    }

    // Buscar usuario
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // ✅ Respuesta
    return res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    return res.status(500).json({
      message: "Error en el servidor al iniciar sesión",
      error: error.message,
    });
  }
};

// ======================================================
// ✅ PERFIL DE USUARIO (opcional / protegido)
// ======================================================
export const getProfile = async (req, res) => {
  try {
    console.log("👤 Obteniendo perfil para usuario:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    return res.json({
      message: "Perfil de usuario",
      user: req.user,
    });
  } catch (error) {
    console.error("❌ Error en getProfile:", error);
    return res.status(500).json({ message: "Error al obtener perfil" });
  }
};

// ======================================================
// ✅ RECUPERACIÓN DE CONTRASEÑA (simulada)
// ======================================================
export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    // Simulación de envío de correo
    console.log(`📨 Correo de recuperación enviado a ${email}`);
    return res.json({
      message: "Correo de recuperación enviado (simulado)",
    });
  } catch (error) {
    console.error("❌ Error en recoverPassword:", error);
    return res.status(500).json({
      message: "Error al procesar la recuperación",
      error: error.message,
    });
  }
};
