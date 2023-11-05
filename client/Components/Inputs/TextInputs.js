import React, { useState } from 'react'
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { TextInput as PaperInput, HelperText } from 'react-native-paper'
import CurrencyInput from 'react-native-currency-input'
import { useTranslation } from 'react-i18next'

export const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export const TextInput = ({ label, onChange, value, placeholder, type, error, helperText, mode, ...props }) => {

    const handleInput = value => {
        if (type === 'numeric' || type === 'number-pad' || type === 'decimal-pad') {
            onChange(value.replace(/[^0-9.]/g, ""))
            return;
        }
        onChange(value)
    }

    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.label}>{label}</Text>
            <PaperInput
                style={styles.input}
                onChangeText={handleInput}
                value={value}
                placeholder={placeholder}
                placeholderTextColor='tomato'
                keyboardType={type ?? 'default'}
                mode={mode ?? "outlined"}
                theme={{ roundness: 10, colors: { text: 'white' } }}
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
    const { t } = useTranslation()

    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.label}>{label}</Text>
            <PaperInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder ?? t('labels.password')}
                placeholderTextColor='tomato'
                secureTextEntry={!showPass}
                mode="outlined"
                activeOutlineColor='tomato'
                outlineColor='grey'
                theme={{ roundness: 10, colors: { text: 'white' } }}
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
                maxLength={12}
                renderTextInput={textInputProps =>
                    <PaperInput
                        style={styles.currencyInput}
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
        paddingVertical: 10,
        backgroundColor: '#202020',
        height: 25,
    },
    inputIcon: {

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
        width: '65%',
        fontSize: 36,
        textAlign: 'center',
        height: 65,
        lineHeight: 60,
    }
});