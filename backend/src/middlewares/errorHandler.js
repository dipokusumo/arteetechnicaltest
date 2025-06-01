const ResponseAPI = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  console.error("[Unhandled Error]", err);

  if (err.name === "ValidationError") {
    return ResponseAPI.badRequest(res, "Validation Error", err.errors);
  }

  if (err.code === "ER_DUP_ENTRY") {
    return ResponseAPI.badRequest(res, "Duplicate field value");
  }

  if (err.name === "UnauthorizedError") {
    return ResponseAPI.unauthorized(res, "Invalid or missing token");
  }

  if (err.message === "Email not found") {
    return ResponseAPI.notFound(res, err.message);
  }

  if (err.message === "Incorrect password") {
    return ResponseAPI.unauthorized(res, err.message);
  }

  if (err.message === "Task not found") {
    return ResponseAPI.notFound(res, err.message);
  }

  return ResponseAPI.serverError(res, err);
};

module.exports = errorHandler;