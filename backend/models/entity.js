// models/Entity.js
module.exports = (sequelize, DataTypes) => {
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
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    }
  });

  return Entity;
};
