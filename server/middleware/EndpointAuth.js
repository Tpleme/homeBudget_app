const { verifyKey } = require('../KeyManager')

const FOendPointAuth = async (req, res, next) => {

    const key = req.headers['authorization'];
    const userId = req.headers['requesting-user']?.split('_')[1]
    console.log(req.headers)

    try {
        if (!req.headers['authorization'] || !req.headers['requesting-user']) throw { code: 401, message: 'Unauthorized' }

        const verifiedUser = await verifyKey(key, userId)

        if (!verifiedUser) {
            return res.status(401).send('Unauthorized')
        } else {
            next(null, true)
        }
    } catch (err) {
        const error = err.code ? err.message : err
        console.log(`Error: ${error}`);
        next('Error: ' + error, false)
    }
}

module.exports = {
    FOendPointAuth,
}