import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import NavigateBack from '../Misc/NavigateBack';
import { DismissKeyboard, TextInput } from '../Components/Inputs/TextInputs';
import CustomButton from '../Components/Buttons/CustomButton';
import { useForm, Controller } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

function ForgotPasswordScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' })
    const { t } = useTranslation()

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <DismissKeyboard>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#202020',
                    paddingTop: insets.top + 50
                }}>
                <NavigateBack navigation={navigation} style={{paddingTop: insets.top}}/>
                <StatusBar barStyle="light-content" backgroundColor="#202020" />
                <View style={styles.mainView}>
                    <Text style={styles.title}>{t('forgotPass.title')}</Text>
                    <Text style={styles.subtitle}>{t('forgotPass.text1')}</Text>
                    <Text style={styles.subtitle}>{t('forgotPass.text2')}</Text>

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
                                placeholder={t('forgotPass.fieldPlaceholder')}
                                value={value}
                                type="email-address"
                                onChange={onChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <CustomButton disabled={!isValid} label={t('forgotPass.button1')} onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
        </DismissKeyboard>
    );
}

export default ForgotPasswordScreen

ForgotPasswordScreen.propTypes = {
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 20,
        paddingHorizontal: 40,
        height: '100%',
        width: '100%',
        gap: 20,
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    }
});