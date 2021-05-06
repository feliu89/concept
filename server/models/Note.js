const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Note = db.define(
  'note',
  {
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    noteName: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    noteDescription: {
      type: DataTypes.STRING(100),
    },
    noteImage: {
      type: DataTypes.STRING(100),
    },
    thumbsUp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    thumbsDown: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    favourites: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    noteStatus: {
      type: DataTypes.STRING(15),
    },
    noteIsPrivate: {
      type: DataTypes.BOOLEAN,
    },
    noteIsArchived: {
      type: DataTypes.BOOLEAN,
    },
    noteCreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    noteCreatedBy: {
      type: DataTypes.INTEGER,
    },
    noteUpdatedAt: {
      type: DataTypes.DATE,
    },
    noteUpdatedBy: {
      type: DataTypes.INTEGER,
    },
    noteDeletedAt: {
      type: DataTypes.DATE,
    },
    noteDeletedBy: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Note;
