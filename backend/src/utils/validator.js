const Joi = require("joi");

exports.validateUser = (data) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);
};

exports.validateTask = (data) => {
  return Joi.object({
    title: Joi.string().required(),
    deadline: Joi.date().required(),
  }).validate(data);
};