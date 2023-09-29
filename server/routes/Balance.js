const { models } = require('../database/index')
const { getIdParam } = require('../utils')
const { Op } = require('sequelize')

const getAll = async (req, res) => {
    const balances = await models.balances.findAll({
        order: [['start_date', 'DESC']],
        include: {
            model: models.app_users,
            as: 'createdBy',
            attributes: {
                exclude: ['password', 'pass_recovery_key', 'complete_profile_key']
            }
        },
    })

    const openRecords = await models.records.findAll({
        where: { date: { [Op.gt]: balances[0].end_date } },
        order: [['date', 'ASC']]
    })

    const recordsAmount = openRecords.reduce((acc, obj) => acc + obj.value, 0)

    const openBalance = {
        total: recordsAmount,
        start_date: balances[0].end_date,
    }

    res.status(200).json({ balances, openBalance })
}

const getOpenBalance = async (req, res) => {
    const balanceData = req.body

    const openRecords = await models.records.findAll({
        where: { date: { [Op.gt]: req.body.start_date } },
        order: [['date', 'DESC']],
        include: [
            { model: models.app_users, as: 'payer', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
            { model: models.app_users, as: 'creator', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
            { model: models.subcategories, include: [models.categories] }
        ],
    })

    const dataByUsers = formatBalanceDataByUsers(JSON.stringify(openRecords))

    return res.status(200).send({ records: openRecords, data: balanceData, dataByUsers })

}

const getByID = async (req, res) => {
    const id = getIdParam(req)

    await models.balances.findOne({
        where: { id },
        include: {
            model: models.app_users,
            as: 'createdBy',
            attributes: {
                exclude: ['password', 'pass_recovery_key', 'complete_profile_key']
            }
        }
    }).then(list => {
        res.status(200).send(list)
    }, err => {
        res.status(500).send(err)
    })
}

const create = async (req, res) => {
    try {
        await models.balances.create(req.body)
        res.status(201).send({ message: 'Balance Created' })

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
const formatBalanceDataByUsers = (data) => {
    const users = []
    // stringify and parse data removes dataValues 
    const parsedData = JSON.parse(data)

    parsedData.forEach(record => {
        const foundUserIndex = users.findIndex(el => el.id === record.payer.id);

        if (foundUserIndex === -1) {
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
                detailedExpenses.push({ ...expense.subcategory, amount: expense.value })
            } else {
                detailedExpenses[foundCatIndex].value += expense.value
            }
        })
        user.detailedExpenses = detailedExpenses

        const totalAmountSpent = user.expenses.reduce((acc, obj) => acc + obj.value, 0)
        user.totalSpent = totalAmountSpent
    })

    return users
}

module.exports = {
    getAll,
    getOpenBalance,
    getByID,
    create,
    update,
    remove,
}