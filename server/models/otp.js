const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OTP = sequelize.define("otps", {
  userId: {
    type: DataTypes.STRING,
  },
  otpcode: {
    type: DataTypes.STRING,
  },
  expiresIn: {
    type: DataTypes.INTEGER,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: "otps",
  timestamps: true,
});

module.exports = OTP;
