import { View, Text, StatusBar } from 'react-native';
import React from 'react'
import NavigateBack from '../../../Misc/NavigateBack';

function Contacts({ navigation }) {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
            }}>
            <NavigateBack navigation={navigation}/>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text style={{ color: 'white' }}>Contacts Screen</Text>
        </View>
    )
}

export default Contacts