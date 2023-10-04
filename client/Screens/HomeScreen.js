import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StatusBar, StyleSheet, Pressable, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Activity from '../Components/HomeComponents/Activity';
import HomePageChart from '../Components/Charts/HomePageChart';
import { getEntity } from '../API/requests';

function HomeScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([])
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        getEntity({ entity: 'records', query: { limit: 10 } }).then(res => {
            setRecords(res.data.rows)
        }, err => {
            console.log(err)
        })
        
        getEntity({entity: 'balance'}).then(res => {
            setChartData([...res.data.balances, res.data.openBalance])
            setLoading(false)
        }, err => {
            console.log(err)
            setLoading(false)
        })
    }


    const homeShortcuts = [
        { title: "Add Record", route: 'addRecord', icon: 'add-outline' },
        { title: "Groceries Lists", route: 'groceries', icon: 'list-outline' },
        { title: "View Activity", route: 'activityScreen', icon: 'calendar-outline' },
        { title: "View Balance", route: 'balanceScreen', icon: 'reader-outline' },
    ]

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={loading} onRefresh={getData} colors={['tomato']} tintColor='tomato'/>}
            style={styles.mainContainer}
            contentContainerStyle={{ justifyContent: 'flex-start', rowGap: 25, paddingBottom: 20 }}
        >
            <StatusBar barStyle="light-content" backgroundColor="black" />
            
            <View style={styles.chartView}>
                <HomePageChart data={chartData} />
            </View>
            <View style={{ padding: 10 }}>
                <View style={styles.shortcutsView}>
                    {homeShortcuts.map((shortcut, index) => (
                        <Pressable key={index} style={styles.shortcut} onPress={() => navigation.navigate(shortcut.route)}>
                            <Ionicons style={{ alignSelf: 'center' }} name={shortcut.icon} size={30} color='white' />
                            <Text style={styles.shortcut.text}>{shortcut.title}</Text>
                        </Pressable>
                    ))}
                </View>
                <Activity records={records} onViewMore={() => navigation.navigate('activityScreen')} />
            </View>
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
        height: "100%",
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
        marginBottom: 20
    },
    shortcut: {
        width: 80,
        height: 80,
        padding: 5,
        backgroundColor: 'tomato',
        borderRadius: 10,
        elevation: 2,
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