const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  requestReset,
  resetPassword,
  updateRole,
  getUser,
  logout,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/auth");

// Define routes and connect them to controller functions
router.post("/register", registerUser);
router.post("/login", login);
router.post("/passwordReset/request", requestReset);
router.post("/passwordReset", resetPassword);
router.put("/updateRole", updateRole);
router.get("/getUser", authenticateUser, getUser);
router.post("/logout", authenticateUser, logout);

module.exports = router;
