import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, Image } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { TextInput, PasswordTextInput, DismissKeyboard } from '../Components/Inputs/TextInputs'
import CustomButton from '../Components/Buttons/CustomButton'
import { useForm, Controller } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'

import Logo from '../assets/Logo/loginLogo.png'
import { loginUser } from '../API/requests'

function LoginScreen({ navigation, ...props }) {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const insets = useSafeAreaInsets();
    const { t } = useTranslation()

    const onSubmit = async (data) => {
        setLoading(true)
        loginUser(data.email, data.password).then(async res => {
            await SecureStore.setItemAsync('token', res.headers.key)
            await SecureStore.setItemAsync('id', res.headers.id)
            props.setToken(res.headers.key)
            setLoading(false)
        }, err => {
            alert(err.response.data)
            console.log(err.response.data)
            setLoading(false)
        })
    }

    return (
        <DismissKeyboard>
            <View style={{ ...styles.view, paddingTop: insets.top, paddingBottom: insets.bottom }}>
                <View style={styles.imgWrapper}>
                    <Image alt='logo' source={Logo} style={styles.logo} />
                </View>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=''
                    rules={{
                        required: t('fieldErrors.email.required'),
                        pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: t('fieldErrors.email.invalid') }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder={t('labels.email')}
                            value={value}
                            type="email-address"
                            onChange={onChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    defaultValue=''
                    rules={{
                        required: t('fieldErrors.password.required'),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <PasswordTextInput
                            value={value}
                            type="password"
                            onChange={onChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />
                    )}
                />
                <CustomButton onPress={handleSubmit(onSubmit)} label={loading ? t('common.loggingIn') : t('common.logIn')} loading={loading} style={{ marginTop: 20 }} />
                <CustomButton onPress={() => navigation.navigate('forgotPass')} label={t('forgotPass.button')} mode='text' style={{ marginTop: 'auto' }} />
                <StatusBar barStyle="light-content" backgroundColor="#202020" />
            </View>
        </DismissKeyboard>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#202020',
        paddingHorizontal: 40,
        paddingVertical: 20,
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