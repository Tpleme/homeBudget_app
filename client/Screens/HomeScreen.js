import React from 'react'
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StatusBar, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const activityMock = [
    { user: "Leandro Melo", cat: "Groceries", amount: 32.56 },
    { user: "Leandro Melo", cat: "Groceries", amount: 32.56 },
    { user: "Leandro Melo", cat: "Groceries", amount: 32.56 },
    { user: "Leandro Melo", cat: "Groceries", amount: 32.56 },
    { user: "Leandro Melo", cat: "Groceries", amount: 32.56 },
    { user: "Ana Quaresma asdasdasd", cat: "Groceries", amount: 32.56 },
]

function HomeScreen({ navigation }) {

    const homeShortcuts = [
        { title: "Add Record" },
        { title: "View history" },
        { title: "View history" },
        { title: "View history" },
        { title: "View history" },
        { title: "View history" },
        { title: "View history" },
    ]

    return (
        <ScrollView
            style={styles.mainContainer}
            contentContainerStyle={{ justifyContent: 'flex-start', rowGap: 20, paddingBottom: 20 }}
        >
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View style={styles.chartView}>

            </View>
            <View style={styles.shortcutsView}>
                {homeShortcuts.map((shortcuts, index) => (
                    <View key={index} style={styles.shortcut}>
                        <Ionicons style={{ alignSelf: 'center' }} name='home' size={30} color='white' />
                        <Text style={styles.shortcut.text}>{shortcuts.title}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.activityView}>
                <View style={styles.activityView.top}>
                    <Text style={styles.activityView.top.title}>Recent Activity</Text>
                    <Text style={styles.activityView.top.viewAll}>View all</Text>
                </View>
                <View style={styles.activityView.activityItens}>
                    {activityMock.map((activity, index) => (
                        <View key={index} style={styles.activityView.activityItens.item}>
                            <Text numberOfLines={1} style={styles.activityView.activityItens.item.user}>{activity.user}</Text>
                            <Text numberOfLines={1} style={styles.activityView.activityItens.item.cat}>{activity.cat}</Text>
                            <Text numberOfLines={1} style={styles.activityView.activityItens.item.amount}>{activity.amount} €</Text>
                        </View>
                    ))}
                </View>
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
        display: 'flex',
        height: "100%",
        padding: 10,
    },
    chartView: {
        borderColor: 'tomato',
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: 200,
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
    activityView: {
        width: '100%',
        borderColor: 'tomato',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItens: 'center',
            title: {
                color: 'white',
                fontSize: 16,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1
            },
            viewAll: {
                color: 'tomato',
                fontSize: 13
            }
        },
        activityItens: {
            marginTop: 10,
            rowGap: 5,
            item: {
                borderColor: "black",
                borderWidth: 1,
                height: 30,
                borderRadius: 5,
                flexDirection: 'row',
                alignItens: 'center',
                justifyContent: 'space-between',
                padding: 5,
                user: {
                    color: 'white',
                    width: '30%',
                    textAlign: 'left'
                },
                cat: {
                    color: 'white',
                    width: '30%',
                    textAlign: 'center'
                },
                amount: {
                    color: 'white',
                    width: '30%',
                    textAlign: 'right'
                }
            }
        }
    },
});