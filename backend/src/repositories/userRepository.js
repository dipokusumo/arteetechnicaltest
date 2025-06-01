const db = require("../../config/db");

exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

exports.loginUser = async ({ email, password }) => {
  const [result] = await db.query(
    "INSERT INTO users (email, password) VALUES (?, ?, ?)",
    [email, password]
  );
  return { id: result.insertId, email, password };
};