// models/index.js
const { sequelize } = require('../config/database');  // Updated path for db connection
const { DataTypes } = require('sequelize');

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
});

// Define the Entity model
const Entity = sequelize.define('Entity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the relationship (One-to-Many)
User.hasMany(Entity, { foreignKey: 'created_by' });
Entity.belongsTo(User, { foreignKey: 'created_by' });

module.exports = { User, Entity };
