import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './Context/User'
import { SocketContext, socket } from './Context/Socket/socket'
import Index from './Index';

function App() {
    return (
        <SafeAreaProvider>
            <UserProvider>
                <SocketContext.Provider value={socket}>
                    <Index />
                </SocketContext.Provider>
            </UserProvider>
        </SafeAreaProvider>
    )
}

export default App