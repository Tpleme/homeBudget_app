import React, { useState } from 'react'
import { Button, View, StyleSheet, StatusBar, Image } from 'react-native'
import { TextInput } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import Logo from '../assets/Logo/loginLogo.png'

function LoginScreen({ navigation }) {
    setBackgroundColorAsync('#202020')

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [showPass, setShowPass] = useState(false)

    const onSubmit = async () => {
        console.log(user, pass)
        const token = 'teste token'
        const userId = '999'

        await SecureStore.setItemAsync('token', token)
        await SecureStore.setItemAsync('userId', userId)
        //Set user signin true automaticamente navega para o dashboard
    }

    const test = async () => {
        const token = await SecureStore.getItemAsync('token')
        const userId = await SecureStore.getItemAsync('userId')
        alert(`Token: ${token}, User ID: ${userId}`)
    }

    return (
        <View style={styles.view}>
            <View style={styles.imgWrapper}>
                <Image alt='Leandro' source={Logo} style={styles.logo} />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setUser}
                value={user}
                placeholder='Email'
                placeholderTextColor='tomato'
                keyboardType="email-address"
                mode="outlined"
                theme={{ colors: { text: 'white' } }}
                activeOutlineColor='tomato'
                outlineColor='grey'

            />
            <TextInput
                style={styles.input}
                onChangeText={setPass}
                value={pass}
                placeholder='Password'
                placeholderTextColor='tomato'
                secureTextEntry={true}
                mode="outlined"
                activeOutlineColor='tomato'
                outlineColor='grey'
                theme={{ colors: { text: 'white' } }}
            />
            <Button onPress={onSubmit} title='Log in' />
            <Button onPress={test} title='test' />
            <StatusBar barStyle="light-content" backgroundColor="#202020" />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#202020',
        padding: 40,
        gap: 10
    },
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: '#202020',
        height: 25
    },
    imgWrapper: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 420
    },
    logo: {
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1
    }
});