const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const JobApplication = sequelize.define("allappliedjobs", {
  id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true,
  },
  app_job_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  app_job_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employee_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employer_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: "allappliedjobs",
  timestamps: true,
});

module.exports = JobApplication;
