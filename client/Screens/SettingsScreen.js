import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function SettingsScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text>Settings Screen</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default SettingsScreen

SettingsScreen.propTypes = {
    navigation: PropTypes.object
}