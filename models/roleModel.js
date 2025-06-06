const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Ensure correct path

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false, // No created_at or updated_at fields in the table
  }
);

module.exports = Role;
