const { models } = require('../database/index')

const getAll = async (req, res) => {
    const categories = await models.categories.findAll({
        include: [models.subcategories]
    })
    res.status(200).json(categories)

}

const getByID = async (req, res) => {
    res.status(501).send('Not implemented')
}

const create = async (req, res) => {
    res.status(501).send('Not implemented')
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