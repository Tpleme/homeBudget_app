const Sequelize = require('sequelize')
require('dotenv').config();

// const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'mysql'
// })

const database = new Sequelize(process.env.DB_URL, {
    dialect: 'mysql'
})

module.exports = database