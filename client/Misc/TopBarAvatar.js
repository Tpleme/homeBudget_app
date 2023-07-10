import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import WomanPortrait from '../assets/placeholders/woman_portrait.jpeg'

function TopBarAvatar() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.avatar}>
                <Image alt='Leandro' source={WomanPortrait} style={styles.image}/>
            </View>
            <Text style={styles.userName}>Leandro</Text>
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