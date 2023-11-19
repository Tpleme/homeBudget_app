const { DataTypes } = require('sequelize')
const database = require('../sequelize_index')

const SubcategoriesModel = database.define('subcategories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = SubcategoriesModel