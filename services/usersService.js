const { User } = require("../model");
const bcrypt = require("bcrypt");

const register = async (username, email, password) => {
  try {
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return { status: false, message: "Username already used", user: null };
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return { status: false, message: "Email already used", user: null };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    user.password = "";
    delete user.password;

    return { status: true, message: "success", user };
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return {
        status: false,
        message: "Incorect username or password",
        user: null,
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: false,
        message: "Incorect username or password",
        user: null,
      };
    }

    user.password = "";
    delete user.password;

    return { status: true, message: "success", user };
  } catch (error) {
    throw new Error(error.message);
  }
};

const setAvatar = async (userId, avatarImage) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {
        projection: { password: 0, createdAt: 0, updatedAt: 0 },
        new: true,
      }
    );

    return { status: true, message: "success", user };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async (userId) => {
  try {
    const users = await User.find({ _id: { $ne: userId } }).select([
      "username",
      "email",
      "avatarImage",
      "_id",
    ]);

    if (users.length === 0) {
      return { status: false, message: "No users found", users: null };
    }

    return { status: true, message: "success", users };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { register, login, setAvatar, getAllUsers };
