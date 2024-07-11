const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job = sequelize.define("alljobs", {
  id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true,
  },
  job_author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_CTC_min: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  job_CTC_max: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  job_CTC_breakup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_fixed_pay: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  job_varaible_pay: {
    type: DataTypes.INTEGER,
  },
  job_salary_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perks: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  skiklls: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  collabrators: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  job_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_location: {
    type: DataTypes.STRING,
  },
  job_relocation: {
    type: DataTypes.STRING,
  },
  job_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: "alljobs",
  hooks: {
    beforeCreate: (job) => {
      job.job_email = job.job_email.toLowerCase();
    },
    beforeUpdate: (job) => {
      job.job_email = job.job_email.toLowerCase();
    }
  },
  timestamps: true, 
});

module.exports = Job;
