import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput as PaperInput, HelperText } from 'react-native-paper'
import CurrencyInput from 'react-native-currency-input'

export const TextInput = ({ label, onChange, value, placeholder, type, error, helperText, ...props }) => {

    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.label}>{label}</Text>
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
                <HelperText style={{ color: 'darkgrey' }} type="info" visible={error}>
                    {helperText}
                </HelperText>
            }
        </View>
    )
}

export const PasswordTextInput = ({ label, onChange, value, placeholder, error, helperText, ...props }) => {
    const [showPass, setShowPass] = useState(false)

    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.label}>{label ?? 'password'}</Text>
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
                <HelperText style={{ color: 'darkgrey' }} type="info" visible={error}>
                    {helperText}
                </HelperText>
            }
        </View>
    )
}

export const InputCurrency = ({ label, onChange, value, placeholder, error, helperText, ...props }) => {

    return (
        <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
            <Text style={styles.currencyLabel}>{label}</Text>
            <CurrencyInput
                value={value}
                onChangeValue={onChange}
                placeholder={placeholder ?? '0.00 €'}
                placeholderTextColor='tomato'
                suffix=" €"
                delimiter="."
                separator=","
                precision={2}
                minValue={0}
                renderTextInput={textInputProps =>
                    <PaperInput
                        style={styles.currencyInput}
                        // mode="outlined"
                        activeUnderlineColor='tomato'
                        theme={{ colors: { text: 'tomato' } }}
                        error={error}
                        {...textInputProps}
                    />}
                {...props}
            />
            {helperText?.length > 0 &&
                <HelperText style={{ color: 'darkgrey' }} type="info" visible={error}>
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
    },
    label: {
        color: 'white',
        marginBottom: 5
    },
    currencyLabel: {
        fontSize: 18,
        color: 'white',
    },
    currencyInput: {
        backgroundColor: '#202020',
        width: '60%',
        fontSize: 36,
        textAlign: 'center',
        height: 65,
        lineHeight: 60,
    }
});