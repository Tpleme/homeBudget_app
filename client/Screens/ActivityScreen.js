import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet, Text, Image, RefreshControl, FlatList } from 'react-native';
import NavigateBack from '../Misc/NavigateBack';
import { getEntity } from '../API/requests';
import CustomButton from '../Components/Buttons/CustomButton';
import DateRangePicker from '../Components/Inputs/DateRangePicker';
import RecordsCard from '../Components/Cards/RecordsCard';
import moment from 'moment';
import { ActivityIndicator, Banner } from 'react-native-paper';
import { useTheme } from 'react-native-paper'

import filterIcon from '../assets/Icons/filter.png'

//TODO: criar componente separado de flatlist com refresh e pagination
//TODO filtros tem que ser diretamente ao servidor visto que não temos todos os dados por causa de pagination
function ActivityScreen({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMoreData, setLoadingMoreData] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [dateRange, setDateRange] = useState({ startDate: undefined, endDate: undefined })
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [ItensCount, setItensCount] = useState(null)
    const theme = useTheme()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        getEntity({ entity: 'records', query: { limit: 10 } }).then(res => {
            setData(res.data.rows)
            setItensCount(res.data.count)
            setFilteredData(res.data.rows)
            setPagination(1)
            setLoading(false)
        }, err => {
            console.log(err)
            setLoading(false)
        })
    }

    const getMoreData = () => {
        if (data.length === 0 || ItensCount === data.length) return

        setLoadingMoreData(true)
        setDateRange({ startDate: undefined, endDate: undefined })

        getEntity({ entity: 'records', query: { limit: 10, offset: (pagination * 10) } }).then(res => {
            console.log(res.data)
            setItensCount(res.data.count)
            setPagination(prev => prev + 1)
            setData(prev => [...prev, ...res.data.rows])
            setFilteredData(prev => [...prev, ...res.data.rows])
            setLoadingMoreData(false)
        }, err => {
            setLoadingMoreData(false)
            console.log(err)
        })
    }

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
                paddingTop: 20,
            }}>
            <NavigateBack navigation={navigation} />
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text style={{ color: 'white', fontSize: 20 }}>Activity</Text>
            <View style={styles.activityMainView}>
                <Banner
                    style={{ backgroundColor: theme.colors.surfaceVariant, marginTop: 10 }}
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
                <FlatList
                    style={styles.activityItensView}
                    contentContainerStyle={{ rowGap: 12, paddingBottom: 20 }}
                    renderItem={({ item }) => <RecordsCard record={item} />}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text style={{ color: 'white', textAlign: 'center' }}>No data found</Text>}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getData} colors={['tomato']} tintColor='tomato' />}
                    ListFooterComponent={
                        data.length === ItensCount ?
                        <Text style={{textAlign: 'center', color: 'white'}}>No more records to show</Text>
                        :
                        <ActivityIndicator animating={loadingMoreData} colors={['tomato']} />
                    }
                    data={filteredData}
                    onEndReached={getMoreData}
                    onEndReachedThreshold={0}
                >
                </FlatList>
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

export default ActivityScreen

const styles = StyleSheet.create({
    activityMainView: {
        flex: 1,
        width: '100%',
    },
    filterView: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    activityItensView: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
});

ActivityScreen.propTypes = {
    navigation: PropTypes.object
}