import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StatusBar } from 'react-native';
import NavigateBack from '../../../Misc/NavigateBack';

function HistoryScreen({ navigation }) {

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
            <Text style={{ color: 'white' }}>HistoryScreen</Text>
        </View>
    );
}

export default HistoryScreen

HistoryScreen.propTypes = {
    navigation: PropTypes.object
}