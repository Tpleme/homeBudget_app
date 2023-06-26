import React from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SettingsList from '../Components/Settings/SettingsList';

function SettingsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    
    return (
        <View
            style={{
                ...styles.mainContainer,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left + 20,
                paddingRight: insets.right + 20,
            }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <SettingsList />
        </View>
    );
}

export default SettingsScreen

SettingsScreen.propTypes = {
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202020',
    },
});