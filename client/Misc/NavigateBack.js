import React from 'react'
import { View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

function NavigateBack({ navigation, backFnc }) {

    const onPress = () => {
        if (backFnc) {
            backFnc()
            return;
        }
        navigation.goBack()

    }

    return (
        <View style={{ ...styles.mainContainer }}>
            <Ionicons name='arrow-back-outline' size={32} color='white' onPress={onPress} />
        </View>
    )
}

export default NavigateBack

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        paddingLeft: 20,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 500
    },
});