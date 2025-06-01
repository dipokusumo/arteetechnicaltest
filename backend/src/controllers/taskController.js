const { validateTask } = require("../utils/validator");
const taskService = require("../services/taskService");
const ResponseAPI = require("../utils/response");

exports.add = async (req, res, next) => {
  const { error } = validateTask(req.body);
  if (error)
    return ResponseAPI.badRequest(res, "Validation Error", error.details);

  try {
    const { id, title, deadline} = await taskService.addTask(req.body, req.user.id);
  return ResponseAPI.success(res, { id, title, deadline }, "Task added", 201);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user.id);
    return ResponseAPI.success(res, tasks);
  } catch (err) {
    next(err);
  }
};

exports.toggle = async (req, res, next) => {
  try {
    const newStatus = await taskService.toggleTask(req.params.id, req.user.id);
    return ResponseAPI.success(res, { newStatus }, "Task status updated");
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};