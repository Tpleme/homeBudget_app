const { DataTypes } = require('sequelize')
const database = require('../sequelize_index')


const BalancesModel = database.define('balances', {
    start_date: {
        type: DataTypes.DATE
    },
    end_date: {
        type: DataTypes.DATE
    },
    total: {
        type: DataTypes.DOUBLE
    },

})

module.exports = BalancesModel