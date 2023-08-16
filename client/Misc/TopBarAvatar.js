import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import WomanPortrait from '../assets/placeholders/woman_portrait.jpeg'
import { useUserInfo } from '../Hooks/useUser'
import { SERVER_URL } from '@env'

function TopBarAvatar() {
    const { userInfo } = useUserInfo()

    return (
        <View style={styles.mainContainer}>
            <View style={styles.avatar}>
                <Image alt='portrait' source={userInfo.picture ? `${SERVER_URL}/resources/images/app_users/${userInfo.picture}` : WomanPortrait} style={styles.image}/>
            </View>
            <Text style={styles.userName}>{userInfo.name}</Text>
        </View>
    )
}

export default TopBarAvatar

const styles = StyleSheet.create({
    mainContainer: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    avatar: {
        height: 25,
        width: 25,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    },
    userName: {
        color: 'white',
        fontWeight: 700,
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    }
});