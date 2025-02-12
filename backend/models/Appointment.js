const sequelize = require('../config/database');  // Adjust the path as needed
const { DataTypes } = require('sequelize');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  contact: DataTypes.STRING,
  date: DataTypes.STRING,
  time: DataTypes.STRING,
  reason: DataTypes.STRING,
}, {
  timestamps: false, // Disable Sequelize's automatic createdAt and updatedAt
});

module.exports = Appointment;

