const fs = require("fs");
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

(async () => {
  try {
    const schema = fs.readFileSync("./db/schema.sql", "utf8");
    const connection = await pool.getConnection();
    await connection.query(schema);
    connection.release();
    console.log("Schema berhasil diimport ke Railway.");
  } catch (err) {
    console.error("Gagal import schema.sql:", err.message);
  }
})();

module.exports = pool;