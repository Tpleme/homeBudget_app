import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import AddRecord from './Screens/AddRecord';
import TopBar from './Components/Panels/TopBar';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
	setBackgroundColorAsync('black')

	return (
		<SafeAreaProvider>
			<TopBar />
			<NavigationContainer>
				<Tab.Navigator initialRouteName="Home"
					headerShown={false}
					activeColor='tomato'
					inactiveColor='white'
					// labeled={false}
					// shifting={true}
					barStyle={{ backgroundColor: 'black' }}
				>
					<Tab.Screen name="Home" component={HomeScreen} options={{
						tabBarIcon: ({ focused, color }) => {
							let iconName = focused
								? 'home'
								: 'home-outline';
							return <Ionicons name={iconName} size={20} color={color} />;
						}
					}} />
					<Tab.Screen name='AddModal' component={AddRecord} options={{
						title: 'Add Record',
						tabBarIcon: ({ focused, color }) => {
							let iconName = focused
								? 'add-circle'
								: 'add-circle-outline';
							return <Ionicons name={iconName} size={20} color={color} />;
						},
					}} />
					<Tab.Screen name="Settings" component={SettingsScreen} options={{
						tabBarIcon: ({ focused, color }) => {
							let iconName = focused
								? 'settings'
								: 'settings-outline';
							return <Ionicons name={iconName} size={20} color={color} />;
						},
					}} />
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });
