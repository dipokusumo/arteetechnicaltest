const db = require("../../config/db");

exports.addTask = async (title, deadline, userId) => {
  const [result] = await db.query(
    "INSERT INTO tasks (title, deadline, user_id) VALUES (?, ?, ?)",
    [title, deadline, userId]
  );
  return { id: result.insertId, title, deadline };
};

exports.getTasksByUser = async (userId) => {
  const [rows] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [
    userId,
  ]);
  return rows;
};

exports.toggleTask = async (taskId, userId) => {
  const [current] = await db.query(
    "SELECT isDone FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  if (!current.length) return null;

  const newStatus = !current[0].isDone;
  await db.query("UPDATE tasks SET isDone = ? WHERE id = ? AND user_id = ?", [
    newStatus,
    taskId,
    userId,
  ]);
  return newStatus;
};

exports.deleteTask = async (taskId, userId) => {
  const [res] = await db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  return res.affectedRows > 0;
};