import { io } from 'socket.io-client'
import React from 'react';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL

export const socket = io(`${SERVER_URL}/app`, { autoConnect: false })
export const SocketContext = React.createContext();