import React, { useState, useRef } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, Image } from 'react-native';
import CustomButton from '../../Buttons/CustomButton';
import { useForm, Controller } from 'react-hook-form'
import { PasswordTextInput } from '../../Inputs/TextInputs'
import { changePassword } from '../../../API/requests';
import backgroundImage from '../../../assets/backgrounds/banner.jpg'
import FlashMessage from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ChangePassword({t, ...props}) {
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, watch, formState: { errors } } = useForm()
    const flashMessageRef = useRef()
    const insets = useSafeAreaInsets();

    const onSubmit = data => {
        setLoading(true)

        changePassword(data, props.user.id).then(res => {
            setLoading(false)
            props.showMessage({ message: res.data, type: 'success' })
            props.closeParent()
        }, err => {
            console.log(err)
            flashMessageRef.current.showMessage({ message: err.response.data, type: 'danger' })
            setLoading(false)
        })
    }

    return (
        <Modal
            animationIn="slideInDown"
            animationOut='slideOutUp'
            style={{...styles.modal, paddingBottom: insets.bottom}}
            isVisible={props.open}
            backdropOpacity={1}
            onBackButtonPress={() => {
                props.close();
            }}
        >
            <View style={{ flexDirection: 'column', height: '100%' }}>
                <Image style={styles.image} source={backgroundImage} />
                <View style={styles.modalView}>
                    <Text style={styles.title}>{t('profile.changePass.title')}</Text>
                    <View style={styles.form}>
                        <Controller
                            control={control}
                            name="newPassword"
                            defaultValue=''
                            rules={{
                                required: t('profile.changePass.fields.newPass.errors.required'),
                                pattern: { value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/, message: t('profile.changePass.fields.newPass.errors.invalid') },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <PasswordTextInput
                                    value={value}
                                    type="password"
                                    label={t('profile.changePass.fields.newPass.label')}
                                    placeholder=''
                                    onChange={onChange}
                                    error={Boolean(errors.newPassword)}
                                    helperText={errors.newPassword?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirmPassword"
                            defaultValue=''
                            rules={{
                                required: t('profile.changePass.fields.confirmPass.errors.required'),
                                validate: pass => {
                                    if (watch('newPassword') !== pass) {
                                        return t('profile.changePass.fields.confirmPass.errors.match')
                                    }
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <PasswordTextInput
                                    value={value}
                                    placeholder=''
                                    label={t('profile.changePass.fields.confirmPass.label')}
                                    type="password"
                                    onChange={onChange}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="authPassword"
                            defaultValue=''
                            rules={{
                                required: t('profile.changePass.fields.authPass.errors.required'),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <PasswordTextInput
                                    value={value}
                                    label={t('profile.changePass.fields.authPass.label')}
                                    type="password"
                                    placeholder=''
                                    onChange={onChange}
                                    error={Boolean(errors.authPassword)}
                                    helperText={errors.authPassword?.message}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.actionsView}>
                        <CustomButton loading={loading} label={loading ? 'Submitting...' : 'Submit'} onPress={handleSubmit(onSubmit)} />
                        <CustomButton disabled={loading} color='darkgrey' label='Cancel' onPress={() => props.close()} />
                    </View>
                </View>
                <FlashMessage ref={flashMessageRef} position='bottom' icon='auto' duration={3000} floating={true} />
            </View>
        </Modal>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalView: {
        width: '100%',
        backgroundColor: '#202020',
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        marginTop: 20,
        gap: 20
    },
    actionsView: {
        marginTop: 'auto',
        gap: 10,
        width: '100%',
    },
    image: {
        height: 200,
        resizeMode: 'stretch',
    }
});