const { models } = require('../database/index')
const { getIdParam } = require('../utils')

const getAll = async (req, res) => {
    const lists = await models.shopping_list.findAll()
    res.status(200).json(lists)

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
        await models.shopping_list.create(req.body)
        res.status(201).send('List created')

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

        await models.shopping_list.update(req.body)

        res.status(200).send('List Updated')


    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

    res.status(501).send('Not implemented')
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