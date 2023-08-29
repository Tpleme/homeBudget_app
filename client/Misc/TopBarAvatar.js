import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useUserInfo } from '../Hooks/useUser'
import UserAvatar from './UserAvatar'

function TopBarAvatar() {
    const { userInfo } = useUserInfo()

    return (
        <View style={styles.mainContainer}>
            <View style={styles.avatar}>
                <UserAvatar user={userInfo} style={styles.image} />
            </View>
            <Text style={styles.userName}>{userInfo.name}</Text>
        </View>
    )
}

export default TopBarAvatar

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
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
        fontWeight: '700',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    }
});