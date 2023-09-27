import React from 'react'
import { View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function NavigateBack({ navigation, backFnc }) {
    const insets = useSafeAreaInsets();

    const onPress = () => {
        if (backFnc) {
            backFnc()
            return;
        }
        navigation.goBack()

    }

    return (
        <View style={{ ...styles.mainContainer, padding: insets.top + 5 }}>
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
        top: 10,
        left: 0,
        zIndex: 500
    },
});