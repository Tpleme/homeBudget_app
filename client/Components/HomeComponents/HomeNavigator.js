import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/HomeScreen';
import ActivityScreen from '../../Screens/ActivityScreen';

const Stack = createStackNavigator();

function HomeNavigator() {

    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
            gestureEnabled: true,
            headerShown: false
        }} >
            <Stack.Screen name="homeScreen" component={HomeScreen} />
            <Stack.Screen name="activityScreen" component={ActivityScreen} />
        </Stack.Navigator>
    )
}

export default HomeNavigator