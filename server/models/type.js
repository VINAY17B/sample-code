const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Type = sequelize.define("types", {
  type_id: {
    type: DataTypes.STRING,
  },
  type_name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: "types",
  timestamps: true, 
});

module.exports = Type;
