import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, Button, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function HomeScreen({ navigation }) {
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
            <Text>Home Screen</Text>
            <Button title='Go to Settings' onPress={() => navigation.navigate('Settings')} />
        </View>
    );
}

export default HomeScreen

HomeScreen.propTypes = {
    navigation: PropTypes.object
}