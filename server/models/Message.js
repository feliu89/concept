const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Message = db.define('message', {
  messageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  messageContent: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  messageUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  messageCreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  messageCreatedBy: {
    type: DataTypes.INTEGER,
  },
  messageUpdatedAt: {
    type: DataTypes.DATE,
  },
  messageUpdatedBy: {
    type: DataTypes.INTEGER,
  },
  messageDeletedAt: {
    type: DataTypes.DATE,
  },
  messageDeletedBy: {
    type: DataTypes.INTEGER,
  },
},
{
  freezeTableName: true,
});

module.exports = Message;
