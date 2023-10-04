const { models } = require('../database/index')
const { responses } = require('../ServerResponses')
const { getIdParam } = require('../utils')

const getAll = async (req, res) => {

    try {
        const records = await models.records.findAndCountAll({
            order: [['date', 'DESC']],
            limit: req.query.limit ? parseInt(req.query.limit) : null,
            offset: req.query.offset ? parseInt(req.query.offset) : null,
            include: [
                { model: models.app_users, as: 'payer', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.app_users, as: 'creator', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.subcategories, include: [models.categories] }
            ],
        })
        res.status(200).json(records)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

const getByID = async (req, res) => {
    try {
        const id = getIdParam(req)

        const record = await models.records.findOne({
            where: { id },
            include: [
                { model: models.app_users, as: 'payer', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.app_users, as: 'creator', attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] } },
                { model: models.subcategories, include: [models.categories] }
            ],
        })

        res.status(200).send(record)

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const create = async (req, res) => {
    try {
        await models.records.create(req.body)

        res.status(201).send(responses.records.CREATED[req.headers.lang])

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

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
}