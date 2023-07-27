import React, { useState } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Dashboard from './Screens/Dashboard'
import LoginScreen from './Screens/LoginScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function App() {
    const [userSignIn, setUserSignIn] = useState(false)

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='login' screenOptions={{
                    ...TransitionPresets.DefaultTransition,
                    gestureEnabled: true,
                    headerShown: false
                }} >
                    {userSignIn ?
                        <Stack.Screen name="dashboard" component={Dashboard} />
                        :
                        <>
                            <Stack.Screen name="login" component={LoginScreen} />
                            <Stack.Screen name="forgotPass" component={ForgotPasswordScreen} />
                        </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App