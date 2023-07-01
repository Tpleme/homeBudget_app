import { View, Text, StatusBar } from 'react-native';
import React from 'react'

function About() {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
            }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text style={{ color: 'white' }}>About Screen</Text>
        </View>
    )
}

export default About