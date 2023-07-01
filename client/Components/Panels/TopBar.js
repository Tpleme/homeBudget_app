import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TopBar() {
    const insets = useSafeAreaInsets();
    
    return (
        <View style={{
            ...styles.mainContainer,
            paddingTop: insets.top + 10,
        }}>
            <Text style={{ color: 'white' }}>Home Budget</Text>
            <Text style={{ color: 'white' }}>Top bar</Text>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
    },
});