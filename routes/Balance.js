const { models } = require('../database/index')
const { getIdParam } = require('../utils')
const { Op } = require('sequelize')

const getAll = async (req, res) => {

    const balances = await models.balances.findAll({
        order: req.query.order ? JSON.parse(req.query.order) : [['start_date', 'DESC']],
        include: {
            model: models.app_users,
            as: 'createdBy',
            attributes: {
                exclude: ['password', 'pass_recovery_key', 'complete_profile_key']
            }
        },
    })

    if (!balances || balances.length === 0) {
        const openRecords = await models.records.findAll({ order: [['date', 'ASC']] })

        if (!openRecords || openRecords.length === 0) {
            return res.status(404).send({ balances: [], openBalance: [] })
        }

        const recordsAmount = openRecords.reduce((acc, obj) => acc + obj.value, 0)

        const openBalance = {
            total: recordsAmount.toFixed(2),
            start_date: openRecords[openRecords.length - 1].date,
        }

        return res.status(200).json({ balances, openBalance })
    }

    const openRecords = await models.records.findAll({
        where: { date: { [Op.gt]: balances[0].end_date } },
        order: [['date', 'ASC']]
    })

    const recordsAmount = openRecords.reduce((acc, obj) => acc + obj.value, 0)

    const openBalance = {
        total: recordsAmount.toFixed(2),
        start_date: balances[0].end_date,
    }

    res.status(200).json({ balances, openBalance })
}

const getOpenBalance = async (req, res) => {
    const balanceData = req.body

    try {

        const openRecords = await models.records.findAll({
            where: { date: { [Op.gte]: req.body.start_date } },
            order: [['date', 'DESC']],
            include: [
                { model: models.app_users, as: 'payer', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.app_users, as: 'creator', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.subcategories, include: [models.categories] }
            ],
        })

        const groupedExpensesByCategory = groupRecordByCategories(JSON.stringify(openRecords))
        const dataByUsers = await formatBalanceDataByUsers(JSON.stringify(openRecords))

        return res.status(200).send({ records: openRecords, data: balanceData, dataByUsers, groupedExpensesByCategory })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

const getByID = async (req, res) => {
    const id = getIdParam(req)

    try {

        const balance = await models.balances.findOne({
            where: { id },
            include: {
                model: models.app_users,
                as: 'createdBy',
                attributes: {
                    exclude: ['password', 'pass_recovery_key', 'complete_profile_key']
                }
            }
        })

        const balanceRecords = await models.records.findAll({
            where: {
                [Op.and]: [
                    { date: { [Op.gte]: balance.start_date } },
                    { date: { [Op.lt]: balance.end_date } },
                ]
            },
            order: [['date', 'DESC']],
            include: [
                { model: models.app_users, as: 'payer', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.app_users, as: 'creator', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.subcategories, include: [models.categories] }
            ],
        })

        const groupedExpensesByCategory = groupRecordByCategories(JSON.stringify(balanceRecords))
        const dataByUsers = await formatBalanceDataByUsers(JSON.stringify(balanceRecords))

        return res.status(200).send({ records: balanceRecords, data: balance, dataByUsers, groupedExpensesByCategory })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const create = async (req, res) => {
    try {
        await models.balances.create(req.body)
        res.status(201).send('Balance closed')

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const update = async (req, res) => {
    res.status(501).send('Not implemented')
}

const remove = async (req, res) => {
    res.status(501).send('Not implemented')
}


//format the data by users
const formatBalanceDataByUsers = async (data) => {

    const allUsers = await models.app_users.findAll({
        attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] }
    })

    const users = allUsers.map(user => ({ ...user.dataValues, expenses: [] }))

    // stringify and parse data removes dataValues 
    const parsedData = JSON.parse(data)

    parsedData.forEach(record => {
        const foundUserIndex = users.findIndex(el => el.id === record.payer.id);

        if (foundUserIndex === -1) { //Isto aqui não é preciso visto que vamos buscar os users a db mas mesmo assim podemos verificar se existe no array
            users.push({ ...record.payer, expenses: [record] })
        } else {
            users[foundUserIndex].expenses.push(record)
        }
    })

    users.forEach(user => {
        const detailedExpenses = []

        user.expenses.forEach(expense => {
            const foundCatIndex = detailedExpenses.findIndex(el => el.id === expense.subcategory.id)

            if (foundCatIndex === -1) {
                detailedExpenses.push({ ...expense.subcategory, totalAmount: expense.value })
            } else {
                detailedExpenses[foundCatIndex].totalAmount += expense.value
            }
        })
        user.detailedExpenses = detailedExpenses

        const totalAmountSpent = user.expenses.reduce((acc, obj) => acc + obj.value, 0)
        user.totalSpent = totalAmountSpent
    })

    return users
}

const groupRecordByCategories = (data) => {

    const records = JSON.parse(data)
    const expensesGroupedByCategories = []

    records.forEach(record => {

        const foundCatIndex = expensesGroupedByCategories.findIndex(el => el.id === record.subcategory.category.id)

        if (foundCatIndex === -1) {
            expensesGroupedByCategories.push({ ...record.subcategory.category, totalAmount: record.value })
        } else {
            expensesGroupedByCategories[foundCatIndex].totalAmount += record.value
        }
    })
    const mappedToFixed = expensesGroupedByCategories.map(el => ({ ...el, totalAmount: parseFloat(el.totalAmount.toFixed(2)) }))
    return mappedToFixed
}

module.exports = {
    getAll,
    getOpenBalance,
    getByID,
    create,
    update,
    remove,
}