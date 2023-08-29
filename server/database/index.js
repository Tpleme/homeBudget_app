const database = require('./sequelize_index')

const AppUsersModel = require('./models/AppUsers')
const AppKeysModel = require('./models/AppKeys')
const CategoriesModel = require('./models/CategoriesModel')
const SubcategoriesModel = require('./models/SubcategoriesModel')
const RecordsModel = require('./models/RecordsModel')

const refreshDB = false;

const initializeDB = async () => {

    AppUsersModel.hasOne(AppKeysModel)

    CategoriesModel.hasMany(SubcategoriesModel)
    SubcategoriesModel.belongsTo(CategoriesModel)

    AppUsersModel.hasMany(RecordsModel, { foreignKey: 'paidBy', as: 'paidRecords' });
    AppUsersModel.hasMany(RecordsModel, { foreignKey: 'createdBy', as: 'createdRecords' });
    
    RecordsModel.belongsTo(AppUsersModel, { foreignKey: 'paidBy', as: 'payer' });
    RecordsModel.belongsTo(AppUsersModel, { foreignKey: 'createdBy', as: 'creator' });

    SubcategoriesModel.hasMany(RecordsModel)
    RecordsModel.belongsTo(SubcategoriesModel)

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