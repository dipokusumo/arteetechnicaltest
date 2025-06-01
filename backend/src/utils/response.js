class ResponseAPI {
  static success(res, data = null, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = "Error", statusCode = 400, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  static badRequest(res, message = "Bad Request", errors = null) {
    return this.error(res, message, 400, errors);
  }

  static unauthorized(res, message = "Unauthorized") {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = "Forbidden") {
    return this.error(res, message, 403);
  }

  static notFound(res, message = "Not Found") {
    return this.error(res, message, 404);
  }

  static serverError(res, error) {
    console.error("[Server Error]", error);

    return this.error(
      res,
      "Internal Server Error",
      500,
      process.env.NODE_ENV === "development" ? error.message || error : null
    );
  }
}

module.exports = ResponseAPI;