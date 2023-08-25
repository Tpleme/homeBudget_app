const { models } = require('../database/index')
const { logOutUser } = require('../routes/FoAuth')

require('dotenv').config()


const handleWsFo = (socket, io) => {
    connectUser(socket)
    socket.on('disconnect', () => onDisconnect(io, socket));
}

const connectUser = async (socket) => {
    console.log('User connected ' + socket.id)
    //TODO: verificar se o uuid é um numero
    await models.app_users.update({ online: true}, { where: { id: socket.handshake.auth.uuid } })

    socket.emit('ready')
}

const onDisconnect = async (io, socket) => {

    console.log('User disconnected ' + socket.id)

    await logOutUser(socket.handshake.auth.uuid)
}

module.exports = {
    handleWsFo
}