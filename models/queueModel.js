const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Queue = sequelize.define(
  "queues",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    paxSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isSeated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateTimeCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    seatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Prevent automatic timestamp columns
  }
);

module.exports = Queue;
