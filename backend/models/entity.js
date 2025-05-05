const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Entity = sequelize.define('Entity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Entity;
