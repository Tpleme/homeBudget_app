import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import About from './pages/About';
import SettingsScreen from '../../Screens/SettingsScreen';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

function SettingsNavigation() {
    
    return (
        <Stack.Navigator initialRouteName='SettingsHome' screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
            headerStyle: { backgroundColor: 'black', borderBottomColor: 'none' },
            headerTintColor: 'white',
        }} >
            <Stack.Screen name="SettingsHome" options={{ headerShown: false, title: 'Settings' }} component={SettingsScreen} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Theme" component={About} />
            <Stack.Screen name="Help" component={About} />
            <Stack.Screen name="Review" component={About} />
        </Stack.Navigator>
    )
}

export default SettingsNavigation