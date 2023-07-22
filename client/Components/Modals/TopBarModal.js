import React from 'react'
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import Modal from 'react-native-modal'
import WomanPortrait from '../../assets/placeholders/woman_portrait.jpeg'

function TopBarModal(props) {
    return (
        <Modal
            animationIn="slideInDown"
            animationOut='fadeOutUp'
            style={styles.modal}
            isVisible={props.open}
            backdropOpacity={0}
            onSwipeComplete={props.close}
            swipeDirection="up"
            onBackButtonPress={() => {
                props.close();
            }}
            onBackdropPress={() => {
                props.close();
            }}
        >
            <View style={styles.modalView}>
                <View style={styles.avatarView}>
                    <View style={styles.avatar}>
                        <Image alt='Leandro' source={WomanPortrait} style={styles.image} />
                    </View>
                    <Text style={styles.avatarText}>Leandro Melo</Text>
                </View>
                <View style={styles.actionView}>
                    <Pressable>
                        <Text style={styles.buttonText}>My Profile</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default TopBarModal

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-start'
    },
    modalView: {
        backgroundColor: 'black',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: 'tomato',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatarView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '45%',
        gap: 5
    },
    actionView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20,
    },
    avatar: {
        height: 50,
        width: 50,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    avatarText: {
        color: 'white'
    },
    buttonText: {
        color: 'tomato',
        textTransform: 'uppercase',
        fontWeight: '700'
    }
});