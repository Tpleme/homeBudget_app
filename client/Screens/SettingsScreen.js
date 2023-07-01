import React from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet } from 'react-native';
import SettingsList from '../Components/Settings/SettingsList';

function SettingsScreen({ navigation }) {

    return (
        <View
            style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <SettingsList navigation={navigation}/>
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
        paddingLeft: 20,
        paddingRight: 20
    },
});