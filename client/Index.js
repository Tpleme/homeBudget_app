import React, { useState, useEffect, useContext } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Dashboard from './Screens/Dashboard'
import LoginScreen from './Screens/LoginScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { getEntity } from './API/requests';
import * as SecureStore from 'expo-secure-store'

import { useUserInfo } from './Hooks/useUser'
import { SocketContext } from './Context/Socket/socket';

const Stack = createStackNavigator();

function Index() {
    const [ready, setReady] = useState(false)
    const [token, setToken] = useState(null)
    const { setUserInfo } = useUserInfo()
    const socket = useContext(SocketContext)

    useEffect(() => {
        setBackgroundColorAsync('#202020')
        socket.on('ready', getUser)

        return () => {
            socket.off('ready', getUser)
        }
    }, [])

    useEffect(() => {

        (async () => {
            if (!token) {
                const savedToken = await SecureStore.getItemAsync('token')
                console.log(savedToken)
                if (savedToken) {
                    setToken(savedToken)
                }
                return;
            }
            connectSocket()
        })

    }, [token])


    const connectSocket = async () => {
        if (socket.connected) {
            getUser();
            return;
        }

        const uuid = token.split('/')[0];

        socket.auth = { uuid, token: token, location }
        socket.connect();
    }

    const getUser = async () => {
        await getEntity('app_users', token.split('/')[0]).then(res => {
            setUserInfo({ ...res.data, token })
            setReady(true)
        }, err => {
            console.log(err)
            setReady(false)
        })
    }

    const LoginWithProps = (props) => { //para poder passar props para o login component, por alguma razão stack não aceita diretamente em component
        return <LoginScreen setToken={setToken} {...props} />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='login' screenOptions={{
                ...TransitionPresets.BottomSheetAndroid,
                gestureEnabled: true,
                headerShown: false
            }} >
                {ready ?
                    <Stack.Screen name="dashboard" component={Dashboard} />
                    :
                    <>
                        <Stack.Screen name="login" component={LoginWithProps} />
                        <Stack.Screen name="forgotPass" component={ForgotPasswordScreen} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Index