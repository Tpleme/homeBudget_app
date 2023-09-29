import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './Context/User'
import { SocketContext, socket } from './Context/Socket/socket'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import { en, registerTranslation } from 'react-native-paper-dates'
import { PaperProvider } from 'react-native-paper';
import { DarkTheme, LightTheme } from './Misc/Theme';
import FlashMessage from "react-native-flash-message";


//TODO substituir todos os maps por flatlists
registerTranslation('pt', en) //pt para dar o formato dd/mm/yyyy, mas assim aparece algumas coisas traduzidas para pt :S
import Index from './Index';

function App() {
    const theme = 'dark'

    return (
        <PaperProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
            <AutocompleteDropdownContextProvider>
                <SafeAreaProvider>
                    <UserProvider>
                        <SocketContext.Provider value={socket}>
                            <Index />
                            <FlashMessage position='bottom' floating={true} duration={3000} icon='auto' />
                        </SocketContext.Provider>
                    </UserProvider>
                </SafeAreaProvider>
            </AutocompleteDropdownContextProvider>
        </PaperProvider>
    )
}

export default App