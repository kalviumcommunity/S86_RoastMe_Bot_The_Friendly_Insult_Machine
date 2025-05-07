// models/index.js
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Load models
const UserModel = require('./User');
const EntityModel = require('./Entity');

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Entity = EntityModel(sequelize, DataTypes);

// Define relationships
User.hasMany(Entity, { foreignKey: 'created_by' });
Entity.belongsTo(User, { foreignKey: 'created_by' });

module.exports = { sequelize, User, Entity };
