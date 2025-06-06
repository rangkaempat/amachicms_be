const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const queueRoutes = require("./routes/queueRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("./config/db"); // Import your database connection

connectDB(); // Call the function to verify the DB connection
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ Match the exact frontend URL
    credentials: true, // ✅ Allows cookies in requests
  })
);
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/queue", queueRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(process.env.FRONTEND_URL);
});
