const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const { handleWsFo } = require('./WS/foWs')
const { createServer } = require('http')
const { Server } = require('socket.io')

const db = require('./database/index')
const app = express();
const server = createServer(app)

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())
app.use(morgan('common'))
app.use('/resources', express.static('resources'))

require('./routes/index')(app);

// const startServer = async () => {
//     await db.init();
//     server.listen(process.env.PORT)
// }

const startServer = async () => {
    await db.init();
    server.listen(process.env.PORT, '0.0.0.0')
}

const io = new Server(server)

io.of('/app').on('connection', socket => handleWsFo(socket, io))

startServer()
