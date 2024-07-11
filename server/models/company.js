const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Company = sequelize.define("company", {
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: false
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  }
}, {
  hooks: {
    beforeCreate: (company) => {
      company.email = company.email.toLowerCase();
    },
    beforeUpdate: (company) => {
      company.email = company.email.toLowerCase();
    }
  }
});

module.exports = Company;
