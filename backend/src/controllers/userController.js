const { validateUser } = require("../utils/validator");
const userService = require("../services/userService");
const ResponseAPI = require("../utils/response");

exports.login = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error)
    return ResponseAPI.badRequest(res, "Validation Error", error.details);

  try {
    const { token, user } = await userService.login(req.body);
    return ResponseAPI.success(res, { token, user }, "Login successful");
  } catch (err) {
    next(err);
  }
};