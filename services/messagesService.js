const { Message } = require("../model");
require("mongoose");

const addMsg = async (from, to, message) => {
  try {
    const data = Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getAllMsg = async (from, to) => {
  try {
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    if (!messages) {
      return null;
    }
    const projectMessages = messages.map((msg) => {
      return {
        _id: msg._id,
        fromself: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return projectMessages;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addMsg, getAllMsg };
