const taskRepository = require("../repositories/taskRepository");

exports.addTask = async (data, userId) => {
  return await taskRepository.addTask(data.title, data.deadline, userId);
};

exports.getTasks = async (userId) => {
  return await taskRepository.getTasksByUser(userId);
};

exports.toggleTask = async (id, userId) => {
  const result = await taskRepository.toggleTask(id, userId);
  if (result === null) throw new Error("Task not found");
  return result;
};

exports.deleteTask = async (id, userId) => {
  const result = await taskRepository.deleteTask(id, userId);
  if (!result) throw new Error("Task not found");
};
