const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employer = sequelize.define("employer", {
  employer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employer_company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employer_domain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employer_mobile: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employer_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  employer_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employer_recruiter: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  employer_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  employer_logo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  salt: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: "employer",
  timestamps: true, 
  hooks: {
    beforeCreate: (employer) => {
      employer.employer_email = employer.employer_email.toLowerCase();
    },
    beforeUpdate: (employer) => {
      employer.employer_email = employer.employer_email.toLowerCase();
    }
  }
});

module.exports = Employer;
