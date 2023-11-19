const { models } = require('../database/index')
const { getIdParam } = require('../utils')

const getAll = async (req, res) => {

    try {
        const lists = await models.shopping_list.findAndCountAll({
            order: [['createdAt', 'DESC']],
            offset: req.query.offset ? parseInt(req.query.offset) : null,
            limit: req.query.limit ? parseInt(req.query.limit) : null,
        })
        res.status(200).json(lists)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

const getByID = async (req, res) => {
    const id = getIdParam(req)

    await models.shopping_list.findByPk(id).then(list => {
        res.status(200).send(list)
    }, err => {
        res.status(500).send(err)
    })
}

const create = async (req, res) => {
    try {
        const newList = await models.shopping_list.create(req.body)
        res.status(201).send({ message: 'List created', list: newList })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const update = async (req, res) => {
    try {
        const id = getIdParam(req)

        const list = await models.shopping_list.findByPk(id)

        if (!list) return res.status(404).send('List not found')

        await models.shopping_list.update(req.body, { where: { id } })

        res.status(200).send('List Updated')


    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const remove = async (req, res) => {
    try {
        const id = getIdParam(req)

        const list = await models.shopping_list.findByPk(id)

        if (!list) return res.status(404).send('List not found')

        await models.shopping_list.destroy({ where: { id } })

        res.status(200).send('List removed')

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
}