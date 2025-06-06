const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // ✅ Extract token from cookies

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token
    req.user = decoded; // ✅ Attach user data to request
    next(); // ✅ Proceed to next middleware or route
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateUser;
