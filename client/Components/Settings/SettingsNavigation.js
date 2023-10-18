import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import About from './pages/About';
import Theme from './pages/Theme'
import Language from './pages/Language'
import SettingsScreen from '../../Screens/SettingsScreen';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

function SettingsNavigation() {

    return (
        <Stack.Navigator initialRouteName='SettingsHome' screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
            headerShown: false
        }} >
            <Stack.Screen name="SettingsHome" component={SettingsScreen} />
            <Stack.Screen name="about" component={About}/>
            <Stack.Screen name="theme" component={Theme} />
            <Stack.Screen name="language" component={Language} />
        </Stack.Navigator>
    )
}

export default SettingsNavigation