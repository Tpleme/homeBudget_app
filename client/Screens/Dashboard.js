import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from '../Components/HomeComponents/HomeNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddRecord from './AddRecord';
import TopBar from '../Components/Panels/TopBar';
import SettingsNavigation from '../Components/Settings/SettingsNavigation';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function Dashboard(props) {
	const { t } = useTranslation()

	useEffect(() => {
		setBackgroundColorAsync('black')
	}, [])

	return (
		<>
			<TopBar goToLogin={props.logOutUser} />
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: 'tomato',
					tabBarStyle: {
						backgroundColor: 'black',
						borderTopWidth: 0,
						borderTopColor: 'transparent',
					},
				}}
			>
				<Tab.Screen name="Home" component={HomeNavigator} options={{
					title: t('navBar.home'),
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = focused
							? 'home'
							: 'home-outline';
						return <Ionicons name={iconName} size={size} color={color} />;
					}
				}} />
				<Tab.Screen name='AddRecord' component={AddRecord} options={{
					title: t('navBar.addRecord'),
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = focused
							? 'add-circle'
							: 'add-circle-outline';
						return <Ionicons name={iconName} size={size} color={color} />;
					},
				}} />
				<Tab.Screen name="Settings" component={SettingsNavigation} options={{
					title: t('navBar.settings'),
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = focused
							? 'settings'
							: 'settings-outline';
						return <Ionicons name={iconName} size={size} color={color} />;
					},
				}} />
			</Tab.Navigator>
		</>
	);
}

