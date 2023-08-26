import React, { useState, useEffect } from 'react'
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
import backgroundImage from '../../../assets/backgrounds/banner.jpg'
import * as ImagePicker from 'expo-image-picker';

function ProfileModal(props) {
    const insets = useSafeAreaInsets();
    const { userInfo, setUserInfo } = useUserInfo()
    const [openChangePass, setOpenChangePass] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [protrait, setPortrait] = useState(null)

    useEffect(() => {
        if (props.open) {
            console.log(userInfo)
        }

    }, [props])

    const pickPortrait = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            console.log(result);
            setPortrait(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
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
                <Image style={styles.topImage} source={backgroundImage} />
                <View style={{ ...styles.backButton, paddingTop: insets.top + 10 }}>
                    <Ionicons name='arrow-back-outline' size={32} color='white' onPress={() => props.close()} />
                </View>
                <View style={styles.portraitWrapper}>
                    <Image alt='portrait' source={userInfo.picture ? `${SERVER_URL}/resources/images/app_users/${userInfo.picture}` : WomanPortrait} style={styles.portrait} />
                    <CustomButton icon='pencil' label='Change Portrait' onPress={pickPortrait} />
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