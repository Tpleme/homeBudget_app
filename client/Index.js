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
        console.log('------------here')
        console.log(token)
        const checkToken = async () => {
            if (!token) {
                const savedToken = await SecureStore.getItemAsync('token')
                if (savedToken) {
                    setToken(savedToken)
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
            getUser(uuid);
            return;
        }

        socket.auth = { uuid, token: token }
        socket.connect();
    }

    const getUser = async (uuid) => {

        await getEntity('app_users', uuid).then(res => {
            setUserInfo({ ...res.data, token })
            setReady(true)
        }, err => {
            console.log(err)
            setReady(false)
        })
    }

    const logOutUser = async () => {
        await SecureStore.deleteItemAsync('token')
        await SecureStore.deleteItemAsync('id')
        setToken(null)
        console.log('here')
        //TODO: quando se faz set ao token aqui, não faz trigger ao useEffect
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
            }} >
                {ready ?
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