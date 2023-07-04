import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import About from './pages/About';
import Contacts from './pages/Contacts'
import Feedback from './pages/Feedback'
import Help from './pages/Help'
import Review from './pages/Review'
import Theme from './pages/Theme'
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
            <Stack.Screen name="help" component={Help} />
            <Stack.Screen name="review" component={Review} />
            <Stack.Screen name="feedback" component={Feedback} />
            <Stack.Screen name="contacts" component={Contacts} />
        </Stack.Navigator>
    )
}

export default SettingsNavigation