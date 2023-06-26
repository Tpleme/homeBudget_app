import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function TopBar() {
    return (
        <View style={styles.mainContainer}>
            <Text style={{ color: 'white' }}>Home Budget</Text>
            <Text style={{ color: 'white' }}>Top bar</Text>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'black',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
    },
});