import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './Components/HomeComponents/HomeNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { setBackgroundColorAsync } from 'expo-navigation-bar'
import AddRecord from './Screens/AddRecord';
import TopBar from './Components/Panels/TopBar';
import SettingsNavigation from './Components/Settings/SettingsNavigation';

const Tab = createBottomTabNavigator();

export default function App() {
	// setBackgroundColorAsync('black')

	return (
		<SafeAreaProvider>
			<TopBar />
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerShown: false,
						tabBarActiveTintColor: 'tomato',
						tabBarStyle: { 
							backgroundColor: 'black', 
							borderTopWidth:0, 
							borderTopColor: 'transparent',
						},
					}}
				>
					<Tab.Screen name="Home" component={HomeNavigator} options={{
						tabBarIcon: ({ focused, color, size }) => {
							let iconName = focused
								? 'home'
								: 'home-outline';
							return <Ionicons name={iconName} size={size} color={color} />;
						}
					}} />
					<Tab.Screen name='AddModal' component={AddRecord} options={{
						title: 'Add Record',
						tabBarIcon: ({ focused, color, size }) => {
							let iconName = focused
								? 'add-circle'
								: 'add-circle-outline';
							return <Ionicons name={iconName} size={size} color={color} />;
						},
					}} />
					<Tab.Screen name="Settings" component={SettingsNavigation} options={{
						tabBarIcon: ({ focused, color, size }) => {
							let iconName = focused
								? 'settings'
								: 'settings-outline';
							return <Ionicons name={iconName} size={size} color={color} />;
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
