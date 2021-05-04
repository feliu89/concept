const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const findUser = async (userEmail) => {
  return await User.findOne({
    attributes: ['userId', 'userPassword'],
    where: { userEmail },
  });
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60,
  });
};

const getAuthInfo = (headers) => {
  const token = headers.authorization.split(' ')[1];
  return jwt.verify(token, process.env.TOKEN_SECRET);
};

module.exports = {
  findUser,
  checkPassword,
  generateToken,
  getAuthInfo,
};
