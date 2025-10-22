import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || process.env.DB_PASSWORD, // ✅ acepta ambas
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // ✅ Necesario para Railway
  },
};

// 🔹 Creamos la conexión
let db;

try {
  console.log("🧩 Intentando conectar con:", dbConfig);
  db = await mysql.createConnection(dbConfig);
  console.log("✅ Conectado correctamente a la base de datos Railway");
} catch (error) {
  console.error("❌ Error al conectar a MySQL:", error.message);
}

export default db;