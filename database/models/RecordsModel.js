const { DataTypes } = require('sequelize')
const database = require('../sequelize_index')

const RecordsModel = database.define('records', {
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = RecordsModel