const { models } = require('../database/index')
const { revokeKey } = require('../KeyManager')

require('dotenv').config()


const handleWsFo = (socket, io) => {
    connectUser(socket)
    socket.on('disconnect', () => onDisconnect(socket));
    socket.on('onLogout', () => onLogout(socket));
}

const connectUser = async (socket) => {
    console.log('User connected ' + socket.id)

    await models.app_users.update({ online: true }, { where: { id: socket.handshake.auth.uuid } })

    socket.emit('ready')
}

const onDisconnect = async (socket) => {
    console.log('User disconnected ' + socket.id)
    await models.app_users.update({ online: false }, { where: { id: socket.handshake.auth.uuid } })
}

const onLogout = async (socket) => {
    console.log('User Logged out ' + socket.id)
    await onDisconnect(socket)
    revokeKey(socket.handshake.auth.uuid)
}

module.exports = {
    handleWsFo
}