const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    reset_expires_at: {
      type: DataTypes.DATE, // TIMESTAMP replaced with DATE for compatibility
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Defaults to current time
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Since created_at and updated_at are handled manually
  }
);

module.exports = User;
