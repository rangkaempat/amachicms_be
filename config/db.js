const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Disables SQL query logging (optional)
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database!");
    console.log(process.env.DB_NAME);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { sequelize, connectDB };
