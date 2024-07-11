const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Resume = sequelize.define("resumes", {
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
  cv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "resumes",
  timestamps: true,
});

module.exports = Resume;
