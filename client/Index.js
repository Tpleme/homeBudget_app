import React, { useState, useEffect, useContext } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Dashboard from './Screens/Dashboard'
import LoginScreen from './Screens/LoginScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { getEntity } from './API/requests';
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen';

import { useUserInfo } from './Hooks/useUser'
import { SocketContext } from './Context/Socket/socket';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

function Index() {
    const [ready, setReady] = useState(false)
    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState(null)
    const { setUserInfo } = useUserInfo()
    const socket = useContext(SocketContext)

    useEffect(() => {
        if (Platform.OS === 'android') setBackgroundColorAsync('#202020')

        socket.on('ready', getUser)

        return () => {
            socket.off('ready', getUser)
        }
    }, [])

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                const savedToken = await SecureStore.getItemAsync('token')
                if (savedToken) {
                    setToken(savedToken)
                } else {
                    setReady(true) //to set logic is over and display screen
                }
                return;
            }
            connectSocket()
        }
        checkToken()
    }, [token])

    const connectSocket = async () => {
        const uuid = token.split('/')[0];
        if (socket.connected) {
            getUser();
            return;
        }

        socket.auth = { uuid, token: token }
        socket.connect();
    }

    const getUser = async () => {
        const userId = await SecureStore.getItemAsync('id')

        await getEntity({ entity: 'app_users', id: userId }).then(res => {
            setUserInfo(res.data)
            setAuth(true)
            setReady(true)
        }, err => {
            console.log(err)
            setAuth(false)
            setReady(true)
        })
    }

    useEffect(() => {
        const checkReady = async () => {
            if (ready) {
                setTimeout(async () => { //Timeout so the login page does not flash when processing the login logic
                    await SplashScreen.hideAsync()
                }, 1000)
            }
        }
        checkReady()
    }, [ready])

    const logOutUser = async () => {
        await SecureStore.deleteItemAsync('token')
        await SecureStore.deleteItemAsync('id')
        setToken(null)
        setAuth(false)
        if (socket.connected) socket.emit('onLogout')
    }

    const LoginWithProps = (props) => { //para poder passar props para o login component, por alguma razão stack não aceita diretamente em component
        return <LoginScreen setToken={setToken} {...props} />
    }

    const DashboardWidthProps = (props) => { //para poder passar props para o login component, por alguma razão stack não aceita diretamente em component
        return <Dashboard logOutUser={logOutUser} {...props} />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='login' screenOptions={{
                ...TransitionPresets.BottomSheetAndroid,
                gestureEnabled: true,
                headerShown: false
            }}>
                {auth ?
                    <Stack.Screen name="dashboard" component={DashboardWidthProps} />
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