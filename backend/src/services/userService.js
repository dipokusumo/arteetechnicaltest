const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

exports.login = async (userData) => {
  const user = await userRepository.findByEmail(userData.email);

  if (!user) throw new Error("Email not found");
  if (user.password !== userData.password)
    throw new Error("Incorrect password");

  const { id, email, name } = user;
  const token = jwt.sign({ id, email, name }, process.env.JWT_SECRET);

  return { token, user: { id, email, name } };
};