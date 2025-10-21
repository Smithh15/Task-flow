import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

try {
  const conn = await db.getConnection();
  console.log("✅ Conectado correctamente a Railway MySQL");
  conn.release();
} catch (err) {
  console.error("❌ Error al conectar a MySQL:", err.message);
}

export default db;
