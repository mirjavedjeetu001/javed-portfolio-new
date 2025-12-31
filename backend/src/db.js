const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function healthCheck() {
  const connection = await pool.getConnection();
  try {
    await connection.query("SELECT 1");
    return true;
  } finally {
    connection.release();
  }
}

module.exports = { pool, healthCheck };
