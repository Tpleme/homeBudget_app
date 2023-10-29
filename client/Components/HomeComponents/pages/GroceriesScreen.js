import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet, ScrollView, Text } from 'react-native';
import { FAB } from 'react-native-paper';
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

    useEffect(() => {
        getEntity({ entity: 'shopping_list' }).then(res => {
            setLists(res.data)
        }, err => {
            console.error(err)
        })
    }, [refresh])

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
                <ScrollView style={styles.listsScrollView} contentContainerStyle={{ gap: 15, paddingBottom: 10 }}>
                    {lists.map(list => <ShoppingListCard key={list.id} list={list} refresh={() => setRefresh(!refresh)} />)}
                </ScrollView>
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