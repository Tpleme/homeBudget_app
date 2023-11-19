const { DataTypes } = require('sequelize')

const ShoppingListsModel = (database) => {
    database.define('shopping_list', {
        name: {
            type: DataTypes.STRING,
        },
        itens: {
            type: DataTypes.TEXT
        }
    })
}

module.exports = ShoppingListsModel