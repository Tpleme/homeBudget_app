import { io } from 'socket.io-client'
import React from 'react';
// import { SERVER_URL } from '@env'

//TODO: env vars acting funny, had to place url right here 
const SERVER_URL = 'http://192.168.1.100:3000'

export const socket = io(`${SERVER_URL}/app`, { autoConnect: false })
export const SocketContext = React.createContext();