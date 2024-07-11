const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Perk = sequelize.define("perks", {
  perks_id: {
    type: DataTypes.STRING,
  },
  perks_name: {
    type: DataTypes.STRING,
  },
  perks_isBlock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: "perks",
  timestamps: true
});

module.exports = Perk;
