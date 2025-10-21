import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // ✅ IMPORTANTE para Railway
  },
};

// 🔹 Creamos la conexión al iniciar el servidor
let db;

try {
  db = await mysql.createConnection(dbConfig);
  console.log("✅ Conectado correctamente a la base de datos Railway");
} catch (error) {
  console.error("❌ Error al conectar a MySQL:", error.message);
}

export default db;