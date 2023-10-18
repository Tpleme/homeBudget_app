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
import ClosedBalanceCard from '../../Cards/ClosedBalanceCard';
import OpenBalanceCard from '../../Cards/OpenBalanceCard';
import { useTranslation } from 'react-i18next';

import filterIcon from '../../../assets/Icons/filter.png'

function BalanceScreen({ navigation }) {
    const [balances, setBalances] = useState([])
    const [openBalance, setOpenBalance] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [dateRange, setDateRange] = useState({ startDate: undefined, endDate: undefined })
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const theme = useTheme()
    const { t } = useTranslation()

    useEffect(() => {
        getEntity({ entity: 'balance' }).then(res => {
            setBalances(res.data.balances)
            setOpenBalance(res.data.openBalance)
            setFilteredData(res.data.balances)
        }, err => {
            console.log(err)
        })
    }, [refresh])

    const onDatePick = ({ startDate, endDate }) => {
        if (!startDate || !endDate) {
            alert('Make sure you select both dates')
            return;
        }

        setOpenDatePicker(false)
        const momentStartDate = moment(startDate)
        const momentEndDate = moment(endDate)

        const filter = balances.filter(el => (
            moment(el.start_date).isBetween(momentStartDate, momentEndDate, 'day', '[]') ||
            moment(el.end_date).isBetween(momentStartDate, momentEndDate, 'day', '[]')
        ))

        setDateRange({ startDate: momentStartDate, endDate: momentEndDate })
        setFilteredData(filter)

    }

    const resetFilter = () => {
        setDateRange({ startDate: undefined, endDate: undefined })
        setFilteredData(balances)
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
            <Text style={styles.title}>{t('balance.title')}</Text>
            <View style={styles.balanceMainView}>
                <Banner
                    style={{ backgroundColor: theme.colors.surfaceVariant }}
                    visible={dateRange.startDate && dateRange.endDate}
                    actions={[{ label: t('balance.clearFilter'), onPress: () => resetFilter() }]}
                    icon={({ size }) => (
                        <Image
                            source={filterIcon}
                            style={{ width: size, height: size, tintColor: theme.colors.primary }}
                        />
                    )}>
                    {(dateRange.startDate && dateRange.endDate) &&
                        <Text>{`${t('common.from')} ${dateRange.startDate.format('DD MMMM YYYY')}\n${t('common.to')}: ${dateRange.endDate.format('DD MMMM YYYY')}`}</Text>
                    }
                </Banner>
                <View style={styles.filterView}>
                    <CustomButton label={t('balance.filterBtn')} onPress={() => setOpenDatePicker(true)} />
                </View>
                <ScrollView style={styles.balanceItensView} contentContainerStyle={{ rowGap: 12, marginBottom: 20 }}>
                    <OpenBalanceCard refresh={() => setRefresh(!refresh)} data={openBalance} t={t} />
                    {filteredData.length > 0 ?
                        filteredData.map((balance, index) => (
                            <ClosedBalanceCard key={index} balance={balance} t={t} />
                        ))
                        :
                        <Text style={{ color: 'white', textAlign: 'center' }}>{t('balance.noData')}</Text>
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