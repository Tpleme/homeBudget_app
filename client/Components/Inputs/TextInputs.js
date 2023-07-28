import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput as PaperInput, HelperText } from 'react-native-paper'

export const TextInput = ({ onChange, value, placeholder, type, error, helperText, ...props }) => {
    return (
        <View style={{ width: '100%' }}>
            <PaperInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor='tomato'
                keyboardType={type}
                mode="outlined"
                theme={{ colors: { text: 'white' } }}
                activeOutlineColor='tomato'
                outlineColor='grey'
                error={error}
                {...props}
            />
            {helperText?.length > 0 &&
                <HelperText type="error" visible={error}>
                    {helperText}
                </HelperText>
            }
        </View>
    )
}

export const PasswordTextInput = ({ onChange, value, placeholder, error, helperText, ...props }) => {
    const [showPass, setShowPass] = useState(false)

    return (
        <View style={{ width: '100%' }}>
            <PaperInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder ?? 'password'}
                placeholderTextColor='tomato'
                secureTextEntry={!showPass}
                mode="outlined"
                activeOutlineColor='tomato'
                outlineColor='grey'
                theme={{ colors: { text: 'white' } }}
                error={error}
                right={<PaperInput.Icon
                    icon={showPass ? 'eye-off' : 'eye'}
                    color='white'
                    style={styles.inputIcon}
                    onPress={() => setShowPass(!showPass)}
                />}
                {...props}
            />
            {helperText?.length > 0 &&
                <HelperText type="error" visible={error}>
                    {helperText}
                </HelperText>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: '#202020',
        height: 25
    },
    inputIcon: {
        top: 5,
    }
});