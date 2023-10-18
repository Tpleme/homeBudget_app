import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet, Text, Image, RefreshControl, FlatList } from 'react-native';
import NavigateBack from '../Misc/NavigateBack';
import { getEntity, getRecordsByDate } from '../API/requests';
import CustomButton from '../Components/Buttons/CustomButton';
import DateRangePicker from '../Components/Inputs/DateRangePicker';
import RecordsCard from '../Components/Cards/RecordsCard';
import moment from 'moment';
import { ActivityIndicator, Banner } from 'react-native-paper';
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next';

import filterIcon from '../assets/Icons/filter.png'

//TODO: criar componente separado de flatlist com refresh e pagination
function ActivityScreen({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMoreData, setLoadingMoreData] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [dateRange, setDateRange] = useState({ startDate: undefined, endDate: undefined })
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [itensCount, setItensCount] = useState(null)
    const [filteredItensCount, setFilteredItensCount] = useState(null)
    const theme = useTheme()
    const { t } = useTranslation()

    useEffect(() => {
        getData()
    }, [])

    const getFilteredRecords = (startDate, endDate) => {
        getRecordsByDate({ startDate, endDate }).then(res => {
            setFilteredData(res.data.rows)
            setFilteredItensCount(res.data.count)
        }, err => {
            console.log(err)
        })
    }

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
        if (data.length === 0 || filteredItensCount === filteredData.length) return

        setLoadingMoreData(true)
        setDateRange({ startDate: undefined, endDate: undefined })

        getEntity({ entity: 'records', query: { limit: 10, offset: (pagination * 10) } }).then(res => {
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

        setDateRange({ startDate: momentStartDate, endDate: momentEndDate })
        getFilteredRecords(startDate, endDate)

    }

    const resetFilter = () => {
        setFilteredItensCount(itensCount)
        setDateRange({ startDate: undefined, endDate: undefined })
        setFilteredData(data)
    }

    const refreshAll = () => {
        setDateRange({ startDate: undefined, endDate: undefined }) 
        getData()
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
            <Text style={{ color: 'white', fontSize: 20 }}>{t('activity.title')}</Text>
            <View style={styles.activityMainView}>
                <Banner
                    style={{ backgroundColor: theme.colors.surfaceVariant, marginTop: 10 }}
                    visible={dateRange.startDate && dateRange.endDate}
                    actions={[{ label: t('activity.clearFilterBtn'), onPress: () => resetFilter() }]}
                    icon={({ size }) => (
                        <Image
                            source={filterIcon}
                            style={{ width: size, height: size, tintColor: theme.colors.primary }}
                        />
                    )}>
                    {(dateRange.startDate && dateRange.endDate) &&
                        <Text>{`${t('common.from')}: ${dateRange.startDate.format('DD MMMM YYYY')}\n${t('common.to')}: ${dateRange.endDate.format('DD MMMM YYYY')}`}</Text>
                    }
                </Banner>
                <View style={styles.filterView}>
                    <CustomButton label={t('activity.filterBtn')} onPress={() => setOpenDatePicker(true)} />
                </View>
                <FlatList
                    style={styles.activityItensView}
                    contentContainerStyle={{ rowGap: 12, paddingBottom: 20 }}
                    renderItem={({ item }) => <RecordsCard record={item} />}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text style={{ color: 'white', textAlign: 'center' }}>{t('activity.noData')}</Text>}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshAll} colors={['tomato']} tintColor='tomato' />}
                    ListFooterComponent={
                        filteredData.length > 0 && (filteredData.length === filteredItensCount) ?
                            <Text style={{ textAlign: 'center', color: 'white' }}>{t('activity.noRecords')}</Text>
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