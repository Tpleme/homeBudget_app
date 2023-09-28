const { models } = require('../database/index')
const { getIdParam } = require('../utils')

const getAll = async (req, res) => {
    const lists = await models.balances.findAll({
        order: [['createdAt', 'DESC']],
        include: {
            model: models.app_users,
            as: 'createdBy',
            attributes: {
                exclude: ['password', 'pass_recovery_key', 'complete_profile_key']
            }
        },
    })
    res.status(200).json(lists)

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

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
}