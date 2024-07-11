const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    set(email) {
      this.setDataValue('email', email.toLowerCase());
    }
  },
  h_password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // Minimum length of 6 characters
    },
  },
  block_user: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  reg_type: {
    type: DataTypes.STRING,
    defaultValue: "normal",
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pic: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  salt: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: "User",
  timestamps: true, // Enable timestamps if needed
});

// Method to authenticate user
User.prototype.authenticate = function (plainText) {
  if (!plainText) return false;
  const hashedPassword = crypto
    .createHmac("sha1", this.salt)
    .update(plainText)
    .digest("hex");
  return this.h_password === hashedPassword;
};

module.exports = User;
