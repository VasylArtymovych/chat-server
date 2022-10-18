const { messagesService: service } = require("../services");
const { Message } = require("../model");

class messagesController {
  addMsg = async (req, res, next) => {
    const { from, to, message } = req.body;

    const data = await service.addMsg(from, to, message);
    if (!data) {
      return res.json({ msg: "Failed to add message to database." });
    }
    return res.json({ msg: "Message added successfully." });
  };

  getAllMsg = async (req, res, next) => {
    const { from, to } = req.body;

    const projectMessages = await service.getAllMsg(from, to);
    if (!projectMessages) {
      return res.json({ msg: "Failed to get messages." });
    }

    return res.json({ projectMessages });
  };
}

// const addMsg = async (req, res, next) => {
//   const { from, to, message } = req.body;

//   const data = await service.addMsg(from, to, message);
//   if (!data) {
//     return res.json({ msg: "Failed to add message to database." });
//   }
//   return res.json({ msg: "Message added successfully." });
// };

// const getAllMsg = async (req, res, next) => {
//   const { from, to } = req.body;

//   const projectMessages = await service.getAllMsg(from, to);
//   if (!projectMessages) {
//     return res.json({ msg: "Failed to get messages." });
//   }

//   return res.json({ projectMessages });
// };

module.exports = new messagesController();
