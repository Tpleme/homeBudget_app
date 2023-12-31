import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, Image } from 'react-native';
import { useUserInfo } from '../../../Hooks/useUser';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../Buttons/CustomButton';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import backgroundImage from '../../../assets/backgrounds/banner.jpg'
import * as ImagePicker from 'expo-image-picker';
import { changePortrait, removePortrait } from '../../../API/requests';
import UserAvatar from '../../../Misc/UserAvatar';
import { showMessage } from 'react-native-flash-message'
import { useTranslation } from 'react-i18next'

function ProfileModal(props) {
    const insets = useSafeAreaInsets();
    const { userInfo, setUserInfo } = useUserInfo()
    const [openChangePass, setOpenChangePass] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [portrait, setPortrait] = useState(null)

    const { t } = useTranslation()

    useEffect(() => {
        if (props.open) {
            if (userInfo.picture) {
                setPortrait(userInfo.picture)
            } else {
                setPortrait(null)
            }
        }

    }, [props, userInfo])

    const pickPortrait = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
        });
        if (!result.canceled) {

            const formData = new FormData()
            formData.append('picture', {
                uri: result.assets[0].uri,
                type: 'image/jpeg',
                name: 'file_name.jpeg'
            })

            changePortrait(userInfo.id, formData).then(res => {
                setUserInfo({ ...userInfo, picture: res.data.portrait })
                showMessage({ message: res.data.message, type: 'success' })
            }, err => {
                console.log(err)
                showMessage({ message: 'Error uploading your photo', type: 'danger' })
            })
        } else {
            alert('You did not select any image.');
        }
    }

    const removePicture = () => {
        removePortrait(userInfo.id).then(res => {
            setUserInfo({ ...userInfo, picture: null })
            showMessage({ message: res.data, type: 'success' })
        }, err => {
            console.log(err)
            showMessage({ message: 'Error removing your photo', type: 'danger' })
        })
    }

    const showMessageFromChild = data => {
        showMessage(data)
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
            <View style={{
                ...styles.modalView,
                paddingTop: insets.top + 20,
                paddingBottom: insets.bottom + 20,
            }}>
                <Image style={styles.topImage} source={backgroundImage} />
                <View style={{ ...styles.backButton, paddingTop: insets.top + 10 }}>
                    <Ionicons name='arrow-back-outline' size={32} color='white' onPress={() => props.close()} />
                </View>
                <View style={styles.portraitWrapper}>
                    <UserAvatar user={{ ...userInfo, picture: portrait }} style={styles.portrait} />
                    <CustomButton icon='pencil' label={portrait ? t('profile.changePortrait') : t('profile.addPortrait')} onPress={pickPortrait} />
                    {portrait &&
                        <CustomButton icon='delete' color='darkgrey' label='Remove Portrait' onPress={removePicture} />
                    }
                </View>
                <View style={styles.userInfoView} >
                    <Text style={{ color: 'tomato', fontSize: 26, textAlign: 'center' }}>{userInfo.name}</Text>
                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{userInfo.email}</Text>
                </View>
                <View style={styles.actionsView}>
                    <CustomButton label={t('profile.button.edit')} onPress={() => setOpenEditProfile(true)} />
                    <CustomButton label={t('profile.button.changePass')} onPress={() => setOpenChangePass(true)} />
                </View>
            </View>
            <EditProfile open={openEditProfile} close={() => setOpenEditProfile(false)} user={userInfo} setUserInfo={setUserInfo} showMessage={showMessageFromChild} t={t} />
            <ChangePassword open={openChangePass} close={() => setOpenChangePass(false)} user={userInfo} showMessage={showMessageFromChild} closeParent={props.closeParent} t={t} />
        </Modal>
    )
}

export default ProfileModal

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
    portraitWrapper: {
        gap: 10
    },
    portrait: {
        width: 200,
        height: 200,
        borderRadius: 50,
        resizeMode: 'cover',
        borderColor: '#202020',
        borderWidth: 5
    },
    userInfoView: {
        marginTop: 50,
    },
    actionsView: {
        marginTop: 'auto',
        gap: 10,
        width: '100%',
    },
    backButton: {
        padding: 10,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 500
    },
    topImage: {
        height: 200,
        resizeMode: 'stretch',
        position: 'absolute'
    }
});