const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Skill = sequelize.define("skills", {
  skill_id: {
    type: DataTypes.STRING,
  },
  skill_name: {
    type: DataTypes.STRING,
  },
  skill_isBlock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: "skills",
  timestamps: true,
});

module.exports = Skill;
