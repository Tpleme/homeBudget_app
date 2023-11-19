const { models } = require('../database/index')
const { getIdParam } = require('../utils')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
// const { foConfirmPassResetEmail, foRequestPassResetEmail, foWelcomeEmailWithPass } = require('../Emails/EmailsSender')
const generator = require('generate-password')
const { Op } = require('sequelize')

const { responses } = require('../ServerResponses')
const { v4: uuidv4 } = require('uuid')

const imageDir = path.join(__dirname, "../resources/images/app_users");

const unlinkAsync = promisify(fs.unlink);
const renameAsync = promisify(fs.rename)

const getAll = async (req, res) => {
    const requestingUserType = req.headers['requesting-user'].split('_')[0]

    if (requestingUserType === 'fo') {
        const users = await models.app_users.findAll({
            attributes: { exclude: ['password', 'pass_recovery_key', 'complete_profile_key'] },
        })
        res.status(200).json(users)
    } else {
        const users = await models.app_users.findAll({
            attributes: { exclude: ['password', 'pass_recovery_key'] },
        })
        res.status(200).json(users)
    }
}

const getByID = async (req, res) => {

    const id = getIdParam(req);
    const user = await models.app_users.findOne({
        where: { id: id },
        attributes: { exclude: ['password', 'pass_recovery_key'] },
    });

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(401).send(responses.users.NO_USER[req.headers.lang])
    }
}

const getByIDAndSecret = async (req, res) => {
    const id = getIdParam(req);

    if (!id || !req.params.secret) return res.status(400).send(responses.common.MALFORMED_REQ[req.headers.lang])

    const user = await models.app_users.findByPk(id);

    if (user) {
        if (user.pass_recovery_key === req.params.secret) {
            return res.status(200).json('ok')
        }
        return res.status(401).send(responses.auth.NO_AUTH[req.headers.lang])
    } else {
        res.status(401).send(responses.users.NO_USER[req.headers.lang])
    }
}

const create = async (req, res) => {
    const requestingUserID = req.headers['requesting-user'].split('_')[1]

    const password = generator.generate({
        length: 16,
        numbers: true,
        strict: true,
    });

    const key = `${uuidv4()}`;

    try {
        const requestingUser = await models.backoffice_users.findOne({ where: { id: requestingUserID }, include: [{ model: models.user_roles }] })
        if (!requestingUser || !requestingUser.user_role.canAddAppUsers) throw { code: 401, message: responses.auth.NO_AUTH[req.headers.lang] }

        await models.app_users.findOne({ where: { email: req.body.email } }).then(user => {
            if (user) throw { code: 400, message: responses.users.ALREADY_USER[req.headers.lang] }
        })

        await bcrypt.hash(password, 10).then(async hash => {
            await models.app_users.create({
                email: req.body.email,
                password: hash,
                image_id: res.locals.image_id,
                complete_profile_key: key,
            }).then(async () => {
                // await foWelcomeEmailWithPass({ email: req.body.email, pass: password, lang: req.headers.lang })
                return res.status(201).send(`${responses.users.USER_CREATED[req.headers.lang]} ${req.body.email}`)
            })
        })

    } catch (err) {
        console.log(`Error: ${err.message ? err.message : err}`);
        err.code ? res.status(err.code).send(err.message) : res.status(500).send('Error: ' + err)
    }
}

const update = async (req, res) => {
    const id = getIdParam(req);
    const requestingUserID = req.headers['requesting-user'].split('_')[1]

    if (Object.keys(req.body).length === 0) return res.status(400).send(responses.common.MALFORMED_REQ[req.headers.lang])

    try {
        const user = await models.app_users.findByPk(id)

        if (requestingUserID !== id.toString()) throw { code: 400, message: responses.auth.NO_AUTH[req.headers.lang] }

        if (!user) throw { code: 400, message: responses.users.NO_USER[req.headers.lang] }

        await models.app_users.update(req.body, { where: { id: id } })

        return res.status(201).send(responses.users.PROFILE_UPDATE_SUCCESS[req.headers.lang])

    } catch (err) {

        console.log(`Error: ${err.message ? err.message : err}`);
        err.code ? res.status(err.code).send(err.message) : res.status(500).send('Error: ' + err)
    }
}

const remove = async (req, res) => {
    const id = getIdParam(req);
    const password = req.body.authPassword
    const requestingUserID = req.headers['requesting-user'].split('_')[1]

    if (!password || password === '') return res.status(400).send(responses.auth.NO_PASS[req.headers.lang])

    const requestingUser = await models.backoffice_users.findOne({ where: { id: requestingUserID }, include: [{ model: models.user_roles }] })
    if (!requestingUser || !requestingUser.user_role.canRemoveAppUsers) return res.status(401).send(responses.auth.NO_AUTH[req.headers.lang])

    bcrypt.compare(password, requestingUser.password).then(async valid => {
        if (valid) {
            await models.app_users.findByPk(id).then(async user => {
                if (user) {
                    if (user.online) {
                        return res.status(400).send('Utilizador encontrasse online, para poder eliminar o mesmo terá de restringir o seu acesso e só depois eliminar')
                    }

                    fs.readdir(imageDir, (err, files) => {
                        if (err) console.log('Cannot find files in: ' + imageDir);
                        files.forEach(file => {
                            if (file.includes(user.image_id)) {
                                unlinkAsync(path.join(imageDir, file), err => {
                                    if (err) console.log('Unable to remove previous file: ' + file)
                                })
                            }
                        })
                    })
                    await models.app_users.destroy({ where: { id: id } })
                    await models.main_chats.update( //remove a referencia a imagem do user nas mensagens de chat
                        { user_picture: null },
                        {
                            where: {
                                [Op.and]: [{ user_id: id }, { user_type: 'app_user' }]
                            }
                        })

                    return res.status(200).send(`${responses.users.USER_REMOVED[req.headers.lang]} User ID: ${user.id}`)
                } else {
                    return res.status(404).send(responses.users.NO_USER[req.headers.lang])
                }

            })
        } else {
            return res.status(401).send('Incorrect Password')
        }
    })
}

const addPicture = async (req, res) => {
    const id = getIdParam(req)
    const requestingUserID = req.headers['requesting-user'].split('_')[1]

    try {
        if (requestingUserID !== id.toString()) throw { code: 400, message: responses.auth.NO_AUTH[req.headers.lang] }

        const user = await models.app_users.findByPk(id)

        if (!user) throw { code: 400, message: responses.users.NO_USER[req.headers.lang] }

        if (req.files === undefined || Object.keys(req.files).length === 0) {
            throw { code: 400, message: responses.users.IMAGE_MISSING[req.headers.lang] }
        }

        //restrict file size
        if (req.files.picture[0].size > 1048576) throw `${req.files.picture[0].originalname}, ${responses.common.IMAGE_TOO_BIG[req.headers.lang]} 1MB`

        await models.app_users.update({
            picture: req.files.picture[0].filename
        }, { where: { id: id } })

        renameAsync(req.files.picture[0].path, path.join(imageDir, req.files.picture[0].filename), err => {
            if (err) throw err
        })

        res.status(201).send({
            message: responses.users.PROFILE_PICTURE_SUCCESS[req.headers.lang],
            portrait: req.files.picture[0].filename
        })

    } catch (err) {
        console.log(`Error: ${err.message ? err.message : err}`);

        if (req.files && Object.keys(req.files).length > 0) {
            unlinkAsync(req.files.picture[0].path, err => {
                if (err) console.log(`Unable to remove file ${req.files.picture[0]}`, err)
            })
        }

        err.code ? res.status(err.code).send(err.message) : res.status(500).send('Error: ' + err)
    }

}

const removePicture = async (req, res) => {
    const id = getIdParam(req);
    const requestingUserID = req.headers['requesting-user'].split('_')[1]

    try {

        if (requestingUserID !== id.toString()) throw { code: 400, message: responses.auth.NO_AUTH[req.headers.lang] }

        const user = await models.app_users.findByPk(id);
        if (!user) throw { code: 404, message: responses.users.NO_USER[req.headers.lang] }

        fs.readdir(imageDir, (err, files) => {
            if (err) console.log('Cannot find files in ' + imageDir)

            files.forEach(file => {
                if (file.includes(`${user.image_id}`)) {
                    unlinkAsync(path.join(imageDir, file), err => {
                        if (err) console.log('Unable to remove file: ' + file)
                    })
                }
            })
        })

        await models.app_users.update({ picture: null }, { where: { id: id } })

        res.status(201).send(responses.users.PROFILE_PICTURE_REMOVED[req.headers.lang])


    } catch (err) {
        console.log(`Error: ${err.message ? err.message : err}`);
        err.code ? res.status(err.code).send(err.message) : res.status(500).send('Error: ' + err)
    }
}

const changePassword = async (req, res) => {
    const id = getIdParam(req);
    const requestingUserID = req.headers['requesting-user'].split('_')[1]

    try {
        if (requestingUserID !== id.toString()) throw { code: 400, message: responses.auth.NO_AUTH[req.headers.lang] }
        if (!req.body.authPassword || !req.body.newPassword) throw { code: 400, message: responses.users.MISSING_PASS[req.headers.lang] }
        if (req.body.authPassword === req.body.newPassword) throw { code: 400, message: responses.users.SAME_PASS[req.headers.lang] }

        const user = await models.app_users.findByPk(id);

        if (!user) return res.status(404).send(responses.users.NO_USER[req.headers.lang])

        await bcrypt.compare(req.body.authPassword, user.password).then(valid => {
            if (!valid) throw { code: 401, message: responses.auth.INCORRECT_CREDENTIALS[req.headers.lang] }
        })

        await bcrypt.hash(req.body.newPassword, 10).then(async hash => {
            await models.app_users.update({ password: hash }, { where: { id: id } })
            return res.status(201).send(responses.users.PASS_CHANGE_SUCCESS[req.headers.lang])
        })

    } catch (err) {
        console.log(`Error: ${err.message ? err.message : err}`);
        err.code ? res.status(err.code).send(err.message) : res.status(500).send('Error: ' + err)
    }
}

const requestPassReset = async (req, res) => {
    const email = req.body.email;

    const secretKey = generator.generate({
        length: 24,
        numbers: true,
        strict: true
    })

    try {
        if (!email) return res.status(400).send(responses.users.NO_EMAIL[req.headers.lang])

        await models.app_users.findOne({ where: { email: email } }).then(user => {
            if (!user) return res.status(404).send(responses.users.NO_USER[req.headers.lang])

            models.app_users.update({ pass_recovery_key: secretKey }, { where: { email: email } }).then(async () => {
                // await foRequestPassResetEmail({ email, userName: user.name, id: user.id, secretKey, lang: req.headers.lang });
                return res.status(200).send(responses.users.PASS_RESET_INSTRUCTIONS[req.headers.lang])
            })
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const resetPassword = async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const secret = req.body.secret

    try {
        if (id && password && req.body.secure && secret) {
            await models.app_users.findByPk(id).then(async user => {
                if (user) {
                    if (secret == user.pass_recovery_key) {
                        bcrypt.hash(password, 10).then(hash => {
                            models.app_users.update({ password: hash, pass_recovery_key: null }, { where: { id: id } })
                        })
                        // await foConfirmPassResetEmail({ email: user.email, name: user.name, lang: req.headers.lang })
                        return res.status(201).send(responses.users.PASS_CHANGE_SUCCESS[req.headers.lang])
                    } else {
                        models.app_users.update({ pass_recovery_key: null }, { where: { id: id } })
                        return res.status(400).send(responses.auth.NO_AUTH[req.headers.lang])
                    }
                } else {
                    return res.status(404).send(responses.users.NO_USER[req.headers.lang])
                }
            })
        } else {
            return res.status(400).send(responses.users.RESET_PASS_NO_INFO[req.headers.lang])
        }
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
    addPicture,
    removePicture,
    changePassword,
    requestPassReset,
    resetPassword,
    getByIDAndSecret,
}