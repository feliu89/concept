const {
  findUser,
  checkPassword,
  generateToken,
  getAuthInfo,
} = require('../helpers/auth');

exports.getAuth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await findUser(email);
    const { userId, userPassword: userHashPassword } = foundUser.dataValues;

    if (checkPassword(password, userHashPassword)) {
      const generatedToken = generateToken(userId, email);
      res.setHeader('Authorization', 'Bearer ' + generatedToken);
    } else {
      res.status(401);
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
};

exports.validateAuth = async (req, res, next) => {
  const { userId } = getAuthInfo(req.headers);
  try {
    if (userId) {
      req.userId = userId;
      next();
    } else {
      res.status(403).send();
    }
  } catch (err) {
    console.log(err);
  }
};
