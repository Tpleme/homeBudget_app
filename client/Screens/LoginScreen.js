import React, { useState } from 'react'
import { Button, View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

function LoginScreen({ navigation }) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const onSubmit = () => {
        console.log(user, pass)

        // navigation.navigate('dashboard')
    }

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.input}
                onChangeText={setUser}
                value={user}
                placeholder='Email'
                keyboardType="email-address"
                mode="outlined"
                activeUnderlineColor='tomato'
                inactiveUnderlineColor='black'

            />
            <TextInput
                style={styles.input}
                onChangeText={setPass}
                value={pass}
                placeholder='Password'
                secureTextEntry={true}
                mode="outlined"
                activeUnderlineColor='tomato'
                inactiveUnderlineColor='black'
            />
            <Button onPress={onSubmit} title='Log in' />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202020',
        padding: 20,
        gap: 10
    },
    input: {
        width: "100%",
        padding: 10,    
    },
});