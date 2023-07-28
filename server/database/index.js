const database = require('./sequelize_index')

const AppUsersModel = require('./models/AppUsers')
const AppKeysModel = require('./models/AppKeys')

const refreshDB = false;

const initializeDB = async () => {

    AppUsersModel.hasOne(AppKeysModel)


    database.authenticate().then(() => {
        console.log('connection to database has been established')
    }).then(async () => {
        await database.sync({ alter: refreshDB });
        console.log('Database models initialized')
    }).catch(err => {
        console.log('Unable to connect to database: ', err)
    })
}

exports.init = initializeDB;
exports.models = database.models