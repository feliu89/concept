const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Retrieve user and password
    const result = await User.findOne({
      attributes: ['userId', 'userPassword'],
      where: { userEmail: email },
    });

    // Load hash from your password DB.
    const passwordIsValid = bcrypt.compareSync(
      password,
      result.dataValues.userPassword
    );

    if (passwordIsValid) {
      console.log('Correct password');
      const token = jwt.sign(
        { userId: result.dataValues.userId, email },
        process.env.TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      res.setHeader('Authorization', 'Bearer ' + token);
      res.end();
      // next();
    } else {
      console.log('Incorrect password');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.checkAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);
  try {
    if (userId) {
      req.userId = userId;
      next();
    } else {
      res.status(403).send('Invalid login');
    }
  } catch (err) {
    console.log(err);
  }
};
