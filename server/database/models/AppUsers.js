const { DataTypes } = require('sequelize')
const database = require('../sequelize_index')

const AppUsersModel = database.define('app_users', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
    },
    picture: {
        type: DataTypes.STRING
    },
    last_login: {
        type: DataTypes.DATE
    },
    online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    pass_recovery_key: {
        type: DataTypes.STRING
    },
    image_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = AppUsersModel