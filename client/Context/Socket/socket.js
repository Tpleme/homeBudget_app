import { io } from 'socket.io-client'
import React from 'react';
import { SERVER_URL } from '@env'

export const socket = io(`${SERVER_URL}/app`, { autoConnect: false })
export const SocketContext = React.createContext();