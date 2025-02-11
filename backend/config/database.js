const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("appointment_db", "root", "Chiyaan@007", {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;  // Export the sequelize instance
