// backend/models/User.js
const sequelize = require('../config/database');  // No destructuring needed
const { DataTypes } = require('sequelize');  // Importing DataTypes

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = User;  // Export the User model
