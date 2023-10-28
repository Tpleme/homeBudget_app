const { models } = require('../database/index')
const { responses } = require('../ServerResponses')
const { getIdParam } = require('../utils')
const { Op } = require('sequelize')

const getAll = async (req, res) => {

    try {
        const records = await models.records.findAndCountAll({
            order: [['date', 'DESC']],
            offset: req.query.offset ? parseInt(req.query.offset) : null,
            limit: req.query.limit ? parseInt(req.query.limit) : null,
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

const getByDate = async (req, res) => {
    try {
        const record = await models.records.findAndCountAll({
            where: { date: { [Op.between]: [req.query.startDate, req.query.endDate] } },
            order: [['date', 'DESC']],
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
    try {
        const id = getIdParam(req)

        const record = await models.records.findByPk(id)

        if (!record) return res.status(404).send('Record not found')

        await models.records.update(req.body, { where: { id } })

        //TODO: enviar email para os utilizadores quando alguem editou um record
        res.status(200).send('Record updated')

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const remove = async (req, res) => {
    try {
        const id = getIdParam(req)

        const record = await models.records.findByPk(id)

        if (!record) return res.status(404).send('Record not found')

        await models.records.destroy({ where: { id } })

        //TODO: enviar email para os utilizadores quando alguem elimina um record
        res.status(200).send('Record deleted')

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
    getByDate
}