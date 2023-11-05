import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet, FlatList, RefreshControl, Text } from 'react-native';
import { FAB, ActivityIndicator } from 'react-native-paper';
import NavigateBack from '../../../Misc/NavigateBack';
import { createEntity, getEntity } from '../../../API/requests'
import ShoppingListCard from '../../Cards/ShoppingListCard';
import ListModal from '../../Modals/ShoppingList/ListModal';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';

function GroceriesScreen({ navigation }) {
    const { t } = useTranslation()

    const [lists, setLists] = useState([])
    const [refresh, setRefresh] = useState(false)
    // for new created list
    const [openNewCreatedList, setOpenNewCreateList] = useState(false)
    const [newList, setNewList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [listsCount, setListsCount] = useState(null)
    const [pagination, setPagination] = useState(1)
    const [loadingMoreData, setLoadingMoreData] = useState(false)

    useEffect(() => {
        getData()
    }, [refresh])

    const getData = () => {
        setLoading(true)
        getEntity({ entity: 'shopping_list', query: { limit: 10 } }).then(res => {
            setLists(res.data.rows)
            setListsCount(res.data.count)
            setPagination(1)
            setLoading(false)
        }, err => {
            setLoading(false)
            console.error(err)
        })
    }

    const getMoreData = () => {
        if (lists.length === 0 || listsCount === lists.length) return;

        setLoadingMoreData(true)

        getEntity({ entity: 'shopping_list', query: { limit: 10, offset: (pagination * 10) } }).then(res => {
            setListsCount(res.data.count)
            setPagination(prev => prev + 1)
            setLists(prev => [...prev, ...res.data.rows])
            setLoadingMoreData(false)
        }, err => {
            setLoadingMoreData(false)
            console.log(err)
        })
    }

    const addNewList = () => {
        createEntity({ entity: 'shopping_list', data: {} }).then(res => {
            setRefresh(!refresh)
            setNewList(res.data.list)
            setOpenNewCreateList(true)
        }, err => {
            showMessage({ message: 'Error creating your list', type: 'danger' })
            console.log(err)
        })
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
            }}>
            <NavigateBack navigation={navigation} />
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View style={styles.shoppingMainView}>
                <Text style={styles.title}>{t('groceries.title')}</Text>
                <FlatList
                    style={styles.listsScrollView}
                    contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
                    renderItem={({ item }) => <ShoppingListCard key={item.id} list={item} refresh={() => setRefresh(!refresh)} />}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text style={{ color: 'white', textAlign: 'center' }}>{t('activity.noData')}</Text>}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getData} colors={['tomato']} tintColor='tomato' />}
                    ListFooterComponent={
                        lists.length > 0 && (lists.length === listsCount) ?
                            <Text style={{ textAlign: 'center', color: 'white' }}>{t('activity.noRecords')}</Text>
                            :
                            <ActivityIndicator animating={loadingMoreData} colors={['tomato']} />
                    }
                    data={lists}
                    onEndReached={getMoreData}
                    onEndReachedThreshold={0}
                >
                </FlatList>
            </View>
            <FAB size='small' mode='flat' icon='plus' style={styles.addButton} onPress={() => addNewList()} />
            {/* For when we create a new list */}
            {newList &&
                <ListModal
                    open={openNewCreatedList}
                    close={() => setOpenNewCreateList(false)}
                    displayMode={'edit'}
                    list={newList}
                    refresh={() => setRefresh(!refresh)}
                />
            }
        </View>
    );
}

export default GroceriesScreen

const styles = StyleSheet.create({
    shoppingMainView: {
        flex: 1,
        width: '100%',
        paddingTop: 18
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        paddingBottom: 10
    },
    listsScrollView: {
        flexDirection: 'column',
        padding: 20,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
})


GroceriesScreen.propTypes = {
    navigation: PropTypes.object
}