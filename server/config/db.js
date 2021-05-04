const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PSWD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false,
  },
});
