const User = require('../models/User');

exports.getAllUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).send(allUsers);
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const foundUser = await User.findOne({ where: { userId } });
    res.status(200).send(foundUser);
  } catch (err) {
    console.log(err);
  }
};

exports.addUser = async (req, res) => {
  const { userFirstName, userLastName, userEmail } = req.body;
  try {
    const createdUser = await User.create({
      userFirstName,
      userLastName,
      userEmail,
    });
    res.status(201).send(createdUser);
  } catch (err) {
    console.log(err);
  }
};
