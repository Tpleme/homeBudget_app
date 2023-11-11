import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import React from 'react'
import NavigateBack from '../../../Misc/NavigateBack';

import Logo from '../../../assets/Logo/loginLogo.png'


function About({ navigation }) {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
            }}>
            <NavigateBack navigation={navigation} />
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View style={styles.mainDiv}>
                <View style={styles.imgWrapper}>
                    <Image alt='logo' source={Logo} style={styles.logo} />
                </View>
                <Text style={{ color: 'white', fontSize: 20 }}>SPLITTER</Text>
                <Text style={{ color: 'white' }}>Version 1.0.0</Text>
            </View>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
        width: '100%',
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
        gap: 20
    },
    imgWrapper: {
        height: 150,
        width: '100%'
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})