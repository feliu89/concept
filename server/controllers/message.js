const Message = require('../models/Message');

exports.getAllMessage = async (req, res) => {
  try {
    const allMessages = await Message.findAll();
    res.status(200).send(allMessages);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};

exports.getMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const foundMessage = await Message.findOne({ where: { messageId } });
    res.status(200).send(foundMessage);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};

exports.addMessage = async (req, res) => {
  const { messageId, messageContent, messageUserId } = req.body;
  try {
    const createdMessage = await Message.create({
      messageId,
      messageContent,
      messageUserId,
    });
    res.status(201).send(createdMessage);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};
