import React, { useState, useRef } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, Image } from 'react-native';
import CustomButton from '../../Buttons/CustomButton';
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from '../../Inputs/TextInputs'
import { editEntity } from '../../../API/requests';
import backgroundImage from '../../../assets/backgrounds/banner.jpg'
import FlashMessage from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function EditProfile({ t, ...props }) {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, formState: { errors, dirtyFields } } = useForm(
        { defaultValues: { name: props.user.name, email: props.user.email } }
    )
    const flashMessageRef = useRef()

    const onSubmit = data => {
        const modifiedValues = {}

        if (Object.keys(dirtyFields).length === 0) {
            flashMessageRef.current.showMessage({ message: 'No info modified', type: 'info' })
            return;
        }

        setLoading(true)
        for (let key in dirtyFields) {
            modifiedValues[key] = data[key]
        }

        editEntity({ entity: 'app_users', id: props.user.id, data: modifiedValues }).then(res => {
            setLoading(false)
            props.setUserInfo({ ...props.user, ...modifiedValues })
            props.showMessage({ message: res.data, type: 'success' })
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
            style={{ ...styles.modal, paddingBottom: insets.bottom }}
            isVisible={props.open}
            backdropOpacity={1}
            onBackButtonPress={() => {
                props.close();
            }}
        >
            <View style={{ flexDirection: 'column', height: '100%' }}>
                <Image style={styles.image} source={backgroundImage} />
                <View style={styles.modalView}>
                    <Text style={styles.title}>{t('profile.editProfile.title')}</Text>
                    <View style={styles.form}>
                        <Text style={{ color: 'white' }}>{t('labels.name')}</Text>
                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: t('fieldErrors.name.required'),
                                minLength: { value: 3, message: t('fieldErrors.name.short') }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    type="name-phone-pad"
                                    onChange={onChange}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Text style={{ color: 'white', marginTop: 10 }}>Email</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    type="email-address"
                                    onChange={onChange}
                                    disabled={true}
                                    helperText={t('profile.editProfile.cannotChange')}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.actionsView}>
                        <CustomButton loading={loading} label={loading ? t('common.submitting') : t('common.submit')} onPress={handleSubmit(onSubmit)} />
                        <CustomButton disabled={loading} color='darkgrey' label='Cancel' onPress={() => props.close()} />
                    </View>
                </View>
                <FlashMessage ref={flashMessageRef} position='bottom' icon='auto' duration={3000} floating={true} />
            </View>
        </Modal>
    )
}

export default EditProfile

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
        marginTop: 20
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