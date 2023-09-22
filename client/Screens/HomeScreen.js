import React from 'react'
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StatusBar, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Activity from '../Components/HomeComponents/Activity';
import HomePageChart from '../Components/Charts/HomePageChart';

function HomeScreen({ navigation }) {

    const homeShortcuts = [
        { title: "Add Record", route: 'addRecord', icon:'add-outline' },
        { title: "Groceries Lists", route: 'groceries', icon:'list-outline' },
        { title: "Activity", route: 'activityScreen', icon:'calendar-outline' },
        { title: "View history", route: 'historyScreen', icon:'reader-outline' },
    ]

    return (
        <ScrollView
            style={styles.mainContainer}
            contentContainerStyle={{ justifyContent: 'flex-start', rowGap: 25, paddingBottom: 20 }}
        >
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View style={styles.chartView}>
                <HomePageChart />
            </View>
            <View style={styles.shortcutsView}>
                {homeShortcuts.map((shortcut, index) => (
                    <Pressable key={index} style={styles.shortcut} onPress={() => navigation.navigate(shortcut.route)}>
                        <Ionicons style={{ alignSelf: 'center' }} name={shortcut.icon} size={30} color='white' />
                        <Text style={styles.shortcut.text}>{shortcut.title}</Text>
                    </Pressable>
                ))}
            </View>
            <Activity onViewMore={() => navigation.navigate('activityScreen')} />
        </ScrollView>
    );
}

export default HomeScreen

HomeScreen.propTypes = {
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#202020',
        display: 'flex',
        height: "100%",
        padding: 10,
    },
    chartView: {
        width: "100%",
        height: 280,
    },
    shortcutsView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    shortcut: {
        width: 80,
        height: 80,
        padding: 5,
        backgroundColor: 'tomato',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        gap: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        text: {
            textAlign: 'center',
            color: 'white'
        }
    },
});