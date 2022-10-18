const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "db: username is required"],
      unique: [true, "db: username in use"],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: [true, "db: email is required"],
      unique: [true, "db: username in use"],
      max: 50,
    },
    password: {
      type: String,
      require: [true, "db: password is required"],
      min: 8,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
