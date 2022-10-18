const asyncHandler = require("express-async-handler");
const { usersService: service } = require("../services");

class usersController {
  register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const { status, message, user } = await service.register(
      username,
      email,
      password
    );
    res.json({ status, message, user });
  });

  login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { status, message, user } = await service.login(username, password);
    res.json({ status, message, user });
  });

  setAvatar = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const { status, message, user } = await service.setAvatar(
      userId,
      avatarImage
    );
    res.json({ status, message, user });
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { status, message, users } = await service.getAllUsers(userId);
    res.json({ status, message, users });
  });
}

module.exports = new usersController();

// const register = async (req, res) => {
//   const { username, email, password } = req.body;
//   const { status, message, user } = await service.register(
//     username,
//     email,
//     password
//   );
//   res.json({ status, message, user });
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;
//   const { status, message, user } = await service.login(username, password);
//   res.json({ status, message, user });
// };

// const setAvatar = async (req, res) => {
//   const userId = req.params.id;
//   const avatarImage = req.body.image;

//   const { status, message, user } = await service.setAvatar(
//     userId,
//     avatarImage
//   );

//   res.json({ status, message, user });
// };

// const getAllUsers = async (req, res, next) => {
//   const userId = req.params.id;
//   const { status, message, users } = await service.getAllUsers(userId);
//   res.json({ status, message, users });
// };

// module.exports = {
//   register,
//   login,
//   setAvatar,
//   getAllUsers,
// };
