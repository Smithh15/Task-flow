import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",      // ⚠️ cambia según tu usuario
  password: "admin",      // ⚠️ cambia según tu contraseña
  database: "gestor_tareas",
});

console.log("✅ Conectado a la base de datos MySQL");

export default db;
