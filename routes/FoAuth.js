const { models } = require('../database/index')
const bcrypt = require('bcrypt')
const { generateKey, revokeKey } = require('../KeyManager')

const auth = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        await models.app_users.findOne({ where: { email: email } }).then(user => {
            if (!user) {
                return res.status(404).send('No user found');
            }

            bcrypt.compare(password, user.password).then(async valid => {
                if (!valid) return res.status(401).send('Incorrect credentials');

                await models.app_users.update({
                    last_login: Date.now(),
                    online: true,
                }, { where: { id: user.id } })


                const key = await generateKey(user.id)

                res.set({
                    'key': key,
                    'id': user.id,
                })

                res.status(200).send('Success')
            })
        })
    } else {
        res.status(401).send('Please provide email and password')
    }
}

const logOutUser = async (userId) => {
    
    await models.app_users.update({ online: false }, { where: { id: userId } }).then(() => {
        revokeKey(userId)
    })
}


module.exports = {
    auth,
    logOutUser
}