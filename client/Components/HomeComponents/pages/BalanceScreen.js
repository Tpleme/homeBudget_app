import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet, ScrollView, Text, Image } from 'react-native';
import NavigateBack from '../../../Misc/NavigateBack';
import { getEntity } from '../../../API/requests';
import CustomButton from '../../Buttons/CustomButton';
import DateRangePicker from '../../Inputs/DateRangePicker';
import moment from 'moment';
import { Banner } from 'react-native-paper';
import { useTheme } from 'react-native-paper'
import BalanceCard from '../../Cards/BalanceCard';

import filterIcon from '../../../assets/Icons/filter.png'
import OpenBalanceCard from '../../Cards/OpenBalanceCard';

function BalanceScreen({ navigation }) {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [dateRange, setDateRange] = useState({ startDate: undefined, endDate: undefined })
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        getEntity({ entity: 'balance' }).then(res => {
            setData(res.data)
            console.log(res.data)
            setFilteredData(res.data)
        }, err => {
            console.log(err)
        })
    }, [])

    const onDatePick = ({ startDate, endDate }) => {
        if (!startDate || !endDate) {
            alert('Make sure you select both dates')
            return;
        }

        setOpenDatePicker(false)
        const momentStartDate = moment(startDate)
        const momentEndDate = moment(endDate)

        const filter = data.filter(el => moment(el.createdAt).isBetween(momentStartDate, momentEndDate, 'day', '[]'))
        setDateRange({ startDate: momentStartDate, endDate: momentEndDate })
        setFilteredData(filter)

    }

    const resetFilter = () => {
        setDateRange({ startDate: undefined, endDate: undefined })
        setFilteredData(data)
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
                paddingTop: 20
            }}>
            <NavigateBack navigation={navigation} />
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text style={styles.title}>Balance History</Text>
            <View style={styles.balanceMainView}>
                <Banner
                    style={{ backgroundColor: theme.colors.surfaceVariant }}
                    visible={dateRange.startDate && dateRange.endDate}
                    actions={[{ label: 'Clear filter', onPress: () => resetFilter() }]}
                    icon={({ size }) => (
                        <Image
                            source={filterIcon}
                            style={{ width: size, height: size, tintColor: theme.colors.primary }}
                        />
                    )}>
                    {(dateRange.startDate && dateRange.endDate) &&
                        <Text>{`From: ${dateRange.startDate.format('DD MMMM YYYY')}\nTo: ${dateRange.endDate.format('DD MMMM YYYY')}`}</Text>
                    }
                </Banner>
                <View style={styles.filterView}>
                    <CustomButton label='Filter by date' onPress={() => setOpenDatePicker(true)} />
                </View>
                <ScrollView style={styles.balanceItensView} contentContainerStyle={{ rowGap: 12, marginBottom: 20 }}>
                    <OpenBalanceCard />
                    {filteredData.length > 0 ?
                        filteredData.map((balance, index) => (
                            <BalanceCard key={index} balance={balance} />
                        ))
                        :
                        <Text style={{ color: 'white', textAlign: 'center' }}>No data found</Text>
                    }
                </ScrollView>
            </View>
            <DateRangePicker
                visible={openDatePicker}
                onDismiss={() => setOpenDatePicker(false)}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onConfirm={onDatePick}
            />
        </View>
    );
}

export default BalanceScreen

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 18
    },
    balanceMainView: {
        flex: 1,
        width: '100%',
    },
    filterView: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    balanceItensView: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
});

BalanceScreen.propTypes = {
    navigation: PropTypes.object
}