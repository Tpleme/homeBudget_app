import React from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, Image } from 'react-native';
import { useUserInfo } from '../../Hooks/useUser';
import { SERVER_URL } from '@env'
import WomanPortrait from '../../assets/placeholders/woman_portrait.jpeg'
import CustomButton from '../Buttons/CustomButton';

function ProfileModal(props) {
    const { userInfo } = useUserInfo()

    return (
        <Modal
            animationIn="slideInDown"
            animationOut='slideOutUp'
            style={styles.modal}
            isVisible={props.open}
            backdropOpacity={1}
            onSwipeComplete={props.close}
            swipeDirection="up"
            onBackButtonPress={() => {
                props.close();
            }}
        >
            <View style={styles.modalView}>
                <View style={styles.portraitWrapper}>
                    <Image alt='portrait' source={userInfo.picture ? `${SERVER_URL}/resources/images/app_users/${userInfo.picture}` : WomanPortrait} style={styles.portrait} />
                    <CustomButton icon='pencil' label='Change Portrait' />
                    <CustomButton icon='delete' label='Remove Portrait' />
                </View>
                <View style={styles.userInfoView} >
                    <Text style={{color: 'tomato', fontSize: 26, textAlign: 'center'}}>{userInfo.name}</Text>
                    <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>{userInfo.email}</Text>
                </View>
            </View>
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
    }
});