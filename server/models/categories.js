const { DataTypes} = require("sequelize");
const sequelize = require("../config/db");


const Categories = sequelize.define("categories", {
  Id : {
    type : DataTypes.STRING,
    primaryKey : true
  },
  cat_id : DataTypes.STRING,
  cat_name : DataTypes.STRING
})

module.exports = Categories;
