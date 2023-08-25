import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../../Buttons/CustomButton';
import { useForm, Controller } from 'react-hook-form'
import { PasswordTextInput } from '../../Inputs/TextInputs'
import { changePassword } from '../../../API/requests';

function ChangePassword(props) {
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, watch, formState: { errors } } = useForm()

    const onSubmit = data => {
        setLoading(true)

        changePassword(data, props.user.id).then(res => {
            alert(res.data)
            setLoading(false)
            props.close()
        }, err => {
            console.log(err)
            alert(err.response.data)
            setLoading(false)
        })
    }

    return (
        <Modal
            animationIn="slideInDown"
            animationOut='slideOutUp'
            style={styles.modal}
            isVisible={props.open}
            backdropOpacity={1}
            onBackButtonPress={() => {
                props.close();
            }}
        >
            <View style={styles.modalView}>
                <Text style={styles.title}>Use the following form to change your password</Text>
                <View style={styles.form}>
                    <Text style={{ color: 'white', marginTop: 10 }}>New Password</Text>
                    <Controller
                        control={control}
                        name="newPassword"
                        defaultValue=''
                        rules={{
                            required: 'New Password required',
                            pattern: { value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/, message: 'Password must have at least 8 characters and include, lower, upper case and numbers' },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <PasswordTextInput
                                value={value}
                                type="password"
                                placeholder=''
                                onChange={onChange}
                                error={Boolean(errors.newPassword)}
                                helperText={errors.newPassword?.message}
                            />
                        )}
                    />

                    <Text style={{ color: 'white', marginTop: 20 }}>Confirm New Password</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        defaultValue=''
                        rules={{
                            required: 'Confirm Password required',
                            validate: pass => {
                                if (watch('newPassword') !== pass) {
                                    return 'Passwords do not match'
                                }
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <PasswordTextInput
                                value={value}
                                placeholder=''
                                type="password"
                                onChange={onChange}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <Text style={{ color: 'white', marginTop: 20 }}>Your current Password</Text>
                    <Controller
                        control={control}
                        name="authPassword"
                        defaultValue=''
                        rules={{
                            required: 'Current Password required',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <PasswordTextInput
                                value={value}
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
        </Modal>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalView: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#202020',
        height: '100%',
        padding: 20,
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    form: {
        width: '100%',
        marginTop: 20
    },
    actionsView: {
        marginTop: 'auto',
        gap: 10,
        width: '100%',
    },
});