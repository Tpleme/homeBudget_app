import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/HomeScreen';
import ActivityScreen from '../../Screens/ActivityScreen';
import AddRecord from '../../Screens/AddRecord';
import { TransitionPresets } from '@react-navigation/stack';
import GroceriesScreen from './pages/GroceriesScreen';
import HistoryScreen from './pages/HistoryScreen';

const Stack = createStackNavigator();

function HomeNavigator() {

    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
            ...TransitionPresets.BottomSheetAndroid,
            // gestureEnabled: true,
            headerShown: false
        }} >
            <Stack.Screen name="homeScreen" component={HomeScreen} />
            <Stack.Screen name="activityScreen" component={ActivityScreen} />
            <Stack.Screen name="addRecord" component={AddRecord} />
            <Stack.Screen name="groceries" component={GroceriesScreen   } />
            <Stack.Screen name="historyScreen" component={HistoryScreen   } />
        </Stack.Navigator>
    )
}

export default HomeNavigator