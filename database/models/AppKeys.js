const { DataTypes } = require('sequelize')
const database = require('../sequelize_index')

const AppKeysModel = database.define('app_keys', {
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
})

module.exports = AppKeysModel