import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, Image } from 'react-native';
import { useUserInfo } from '../../../Hooks/useUser';
import { SERVER_URL } from '@env'
import Ionicons from 'react-native-vector-icons/Ionicons';
import WomanPortrait from '../../../assets/placeholders/woman_portrait.jpeg'
import CustomButton from '../../Buttons/CustomButton';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function ProfileModal(props) {
    const insets = useSafeAreaInsets();
    const { userInfo, setUserInfo } = useUserInfo()
    const [openChangePass, setOpenChangePass] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)

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
                <View style={{ ...styles.backButton, paddingTop: insets.top + 10 }}>
                    <Ionicons name='arrow-back-outline' size={32} color='white' onPress={() => props.close()} />
                </View>
                <View style={styles.portraitWrapper}>
                    <Image alt='portrait' source={userInfo.picture ? `${SERVER_URL}/resources/images/app_users/${userInfo.picture}` : WomanPortrait} style={styles.portrait} />
                    <CustomButton icon='pencil' label='Change Portrait' />
                    <CustomButton icon='delete' label='Remove Portrait' />
                </View>
                <View style={styles.userInfoView} >
                    <Text style={{ color: 'tomato', fontSize: 26, textAlign: 'center' }}>{userInfo.name}</Text>
                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{userInfo.email}</Text>
                </View>
                <View style={styles.actionsView}>
                    <CustomButton label='Edit Profile' onPress={() => setOpenEditProfile(true)} />
                    <CustomButton label='Change Password' onPress={() => setOpenChangePass(true)} />
                </View>
            </View>
            <EditProfile open={openEditProfile} close={() => setOpenEditProfile(false)} user={userInfo} setUserInfo={setUserInfo} />
            <ChangePassword open={openChangePass} close={() => setOpenChangePass(false)} user={userInfo} />
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
        resizeMode: 'cover'
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
});