const { v4: uuidv4 } = require('uuid')
const { models } = require('./database/index')
require('dotenv').config()

const generateKey = async (id) => {
    const key = `${id}/${uuidv4()}`;

    try {
        await models.app_keys.create({ key: key, appUserId: id });

        return key
    } catch (err) {
        console.log(err)
        return null
    }
}

const revokeKey = async (id) => {
    try {
        await models.app_keys.destroy({ where: { appUserId: id } });
    } catch (err) {
        console.log(err)
    }
}

const verifyKey = async (key, userId) => {

    try {
        const foundKey = await models.app_keys.findOne({ where: { key } })

        if (foundKey && key && userId) {
            if (foundKey.appUserId.toString() === userId.toString()) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = {
    generateKey,
    revokeKey,
    verifyKey,
}