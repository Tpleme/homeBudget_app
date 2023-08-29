const { DataTypes } = require('sequelize')
const database = require('../sequelize_index')

const CategoriesModel = database.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = CategoriesModel