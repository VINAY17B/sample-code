const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, "root", "", {
    host : "localhost",
    dialect : "mysql"
})

module.exports = sequelize;