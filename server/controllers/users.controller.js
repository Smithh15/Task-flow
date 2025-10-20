import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = "supersecreto123"; // ⚠️ cámbialo luego y guárdalo en .env

// ✅ Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Faltan campos" });

    // Verificar si ya existe
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "El usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashed,
    ]);

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Faltan campos" });

    // 🔍 Buscar usuario
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // ⚠️ Si no existe, error
    if (rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const user = rows[0];

    // 🔐 Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // ✅ Generar token con ID del usuario
    const token = jwt.sign({ id: user.id }, "secreto_super_seguro", {
      expiresIn: "1h",
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};


// ✅ Perfil de usuario (opcional)
export const getProfile = async (req, res) => {
  res.json({ message: "Perfil de usuario (en construcción)" });
};


export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Correo no encontrado" });

    // Aquí normalmente enviarías un correo con un enlace único
    console.log(`🔐 Enlace de recuperación enviado a ${email}`);

    res.json({ message: "Correo de recuperación enviado (simulado)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al recuperar contraseña" });
  }
};
