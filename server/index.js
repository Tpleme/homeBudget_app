const express = require('express')
const cors = require('cors')
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
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression())
app.use(morgan('common'))
app.use(cors({
    origin: '*', //TODO ver se é preciso usar cors
    allowedHeaders: ['Content-type', 'Authorization', 'requesting-user'],
    exposedHeaders: ['key', 'id']
}))
app.use('/resources', express.static('resources'))

require('./routes/index')(app);

const startServer = async () => {
    await db.init();
    server.listen(process.env.SERVER_PORT || 3000)
}

const io = new Server(server, {
    maxHttpBufferSize: 1e8,
    cors: {
        origin: [process.env.CLIENT_URL],
    }
})

io.of('/app').on('connection', socket => handleWsFo(socket, io))

startServer()
