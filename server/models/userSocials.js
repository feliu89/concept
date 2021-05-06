const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UserSocials = db.define(
  'UserSocials',
  {
    UserSocialsNoteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    UserSocialsUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    UserSocialsFavourite: {
      type: DataTypes.BOOLEAN,
    },
    UserSocialsThumbsState: {
      type: DataTypes.STRING(4),
    },
    UserSocialsCreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UserSocialsCreatedBy: {
      type: DataTypes.INTEGER,
    },
    UserSocialsUpdatedAt: {
      type: DataTypes.DATE,
    },
    UserSocialsUpdatedBy: {
      type: DataTypes.INTEGER,
    },
    UserSocialsDeletedAt: {
      type: DataTypes.DATE,
    },
    UserSocialsDeletedBy: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = UserSocials;
