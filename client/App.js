import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './Context/User'
import { SocketContext, socket } from './Context/Socket/socket'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import Index from './Index';

function App() {
    return (
        <AutocompleteDropdownContextProvider>
            <SafeAreaProvider>
                <UserProvider>
                    <SocketContext.Provider value={socket}>
                        <Index />
                    </SocketContext.Provider>
                </UserProvider>
            </SafeAreaProvider>
        </AutocompleteDropdownContextProvider>
    )
}

export default App