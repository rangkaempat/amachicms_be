const {
  createUser,
  loginUser,
  requestPasswordReset,
  resetPasswordUser,
  updateUserRole,
  getUserById,
} = require("../services/userService");

// Handles user registration
const registerUser = async (req, res) => {
  try {
    const { username, password, role_id } = req.body;
    const user = await createUser(username, password, role_id);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handles user login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await loginUser(username, password);

    // Set JWT as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Include token in the response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token"); // ✅ No need for extra options
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout" });
  }
};

// Handles password reset requests
const requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = await requestPasswordReset(email);
    res
      .status(200)
      .json({ message: "Password reset token generated", resetToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handles resetting the password
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const message = await resetPasswordUser(resetToken, newPassword);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handles updating user role
const updateRole = async (req, res) => {
  try {
    const { userId, newRoleId } = req.body;
    const message = await updateUserRole(userId, newRoleId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.id); // Use authenticated user ID
    if (!user) return res.status(404).json({ error: "User not found." });
    res.status(200).json(user); // Send user details
  } catch (error) {
    res.status(500).json({ error: "Server error: Unable to retrieve user." });
  }
};

module.exports = {
  registerUser,
  login,
  logout,
  requestReset,
  resetPassword,
  updateRole,
  getUser,
};
