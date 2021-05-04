const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userFirstName: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  userLastName: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  userPassword: {
    type: DataTypes.STRING(60),
  },
  userPasswordSalt: {
    type: DataTypes.INTEGER,
  },
  userPasswordHashAlgorithm: {
    type: DataTypes.STRING(10),
  },
  userImagePath: {
    type: DataTypes.STRING,
  },
  userIsActive: {
    type: DataTypes.BOOLEAN,
  },
  userCreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userCreatedBy: {
    type: DataTypes.INTEGER,
  },
  userUpdatedAt: {
    type: DataTypes.DATE,
  },
  userUpdatedBy: {
    type: DataTypes.INTEGER,
  },
  userDeletedAt: {
    type: DataTypes.DATE,
  },
  userDeletedBy: {
    type: DataTypes.INTEGER,
  },
},
{
  freezeTableName: true,
});

module.exports = User;
