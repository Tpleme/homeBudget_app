import React from 'react'
import { View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function NavigateBack({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ ...styles.mainContainer, padding: insets.top + 5 }}>
            <Ionicons name='arrow-back-outline' size={32} color='white' onPress={() => navigation.goBack()} />
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
        width: '100%',
        zIndex: 500
    },
});