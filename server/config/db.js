// server/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "gestor_tareas"
});

db.connect(err => {
  if (err) {
    console.error("❌ Error al conectar con MySQL:", err);
  } else {
    console.log("✅ Conectado a la base de datos MySQL");
  }
});

export default db;
