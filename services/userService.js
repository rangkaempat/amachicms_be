const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Op } = require("sequelize");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
const createUser = async (username, password, role_id) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({
    username,
    password_hash: hashedPassword,
    role_id,
  });
};

// Login user and generate JWT
const loginUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id, role_id: user.role_id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return { token, user };
};

// Reset password (step 1: request reset)
const requestPasswordReset = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "15m",
  });
  await user.update({
    reset_token: resetToken,
    reset_expires_at: new Date(Date.now() + 15 * 60 * 1000),
  });

  return resetToken; // Send this token via email
};

// Reset password (step 2: set new password)
const resetPasswordUser = async (resetToken, newPassword) => {
  const user = await User.findOne({
    where: {
      reset_token: resetToken,
      reset_expires_at: { [Op.gt]: new Date() },
    },
  });
  if (!user) throw new Error("Invalid or expired token");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({
    password_hash: hashedPassword,
    reset_token: null,
    reset_expires_at: null,
  });

  return "Password reset successful";
};

// Update user role
const updateUserRole = async (userId, newRoleId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  await user.update({ role_id: newRoleId });
  return "User role updated successfully";
};

const getUserById = async (userId) => {
  return await User.findByPk(userId, {
    attributes: ["id", "username", "role_id"], // Fetch only needed fields
  });
};

// Export functions
module.exports = {
  createUser,
  loginUser,
  requestPasswordReset,
  resetPasswordUser,
  updateUserRole,
  getUserById,
};
