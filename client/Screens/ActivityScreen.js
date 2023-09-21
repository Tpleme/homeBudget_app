import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StatusBar, StyleSheet, ScrollView } from 'react-native';
import NavigateBack from '../Misc/NavigateBack';
import { getEntity } from '../API/requests';
import UserAvatar from '../Misc/UserAvatar';
import moment from 'moment'
import CustomButton from '../Components/Buttons/CustomButton';
import DateRangePicker from '../Components/Inputs/DateRangePicker';

function ActivityScreen({ navigation }) {
    const [data, setData] = useState([])
    const [dateRange, setDateRange] = useState({ startDate: undefined, endDate: undefined })
    const [openDatePicker, setOpenDatePicker] = useState(false)

    useEffect(() => {
        getEntity({ entity: 'records' }).then(res => {
            setData(res.data)
        }, err => {
            console.log(err)
        })
    }, [])

    const onDatePick = ({ startDate, endDate }) => {
        setOpenDatePicker(false)
        console.log(startDate, endDate)
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
                paddingTop: 60
            }}>
            <NavigateBack navigation={navigation} />
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View style={styles.activityMainView}>
                <View style={styles.filterView}>
                    <CustomButton label='Filter by date' onPress={() => setOpenDatePicker(true)} />
                    <DateRangePicker
                        visible={openDatePicker}
                        onDismiss={() => setOpenDatePicker(false)}
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        onConfirm={onDatePick}
                    />
                </View>
                <ScrollView style={styles.activityItensView}>
                    {data.map((record, index) => (
                        <View key={index} style={styles.activityItem}>
                            <View style={styles.leftView}>
                                <View style={styles.avatar}>
                                    <UserAvatar user={record.payer} style={styles.image} />
                                    <Text numberOfLines={1} style={styles.userName}>{record.payer.name}</Text>
                                </View>
                                <View style={styles.bottomView}>
                                    <Text numberOfLines={1} style={styles.catText}>{record.subcategory.name}</Text>
                                    <Text numberOfLines={1} style={styles.dateText}>{moment(record.createdAt).format('DD MMM YYYY hh:mm')}</Text>
                                </View>
                            </View>
                            <Text numberOfLines={1} style={styles.amountText}>{record.value} €</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default ActivityScreen

const styles = StyleSheet.create({
    activityMainView: {
        flex: 1,
        width: '100%',
        gap: 10
    },
    filterView: {
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        padding: 20
    },
    activityItensView: {
        flex: 1,
        width: '100%',
        padding: 10,
        marginBottom: 10
    },
    activityItem: {
        backgroundColor: '#2a2a2a',
        elevation: 2,
        borderRadius: 5,
        flexDirection: 'row',
        alignItens: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 7
    },
    leftView: {
        flex: 1,
        gap: 5,
    },
    avatar: {
        flexDirection: 'row',
        alignItens: 'center',
        gap: 5,
    },
    image: {
        height: 25,
        width: 25,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    userName: {
        color: 'white',
        fontSize: 17,
        alignSelf: 'center'
    },
    bottomView: {
        flexDirection: 'row',
        gap: 10,
    },
    catText: {
        color: 'tomato',
    },
    dateText: {
        color: 'grey',
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    amountText: {
        color: 'tomato',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'center'
    },
});

ActivityScreen.propTypes = {
    navigation: PropTypes.object
}