import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet, ScrollView } from 'react-native';
import NavigateBack from '../../../Misc/NavigateBack';
import { getEntity } from '../../../API/requests'
import ShoppingListCard from '../../Cards/ShoppingListCard';

function GroceriesScreen({ navigation }) {
    const [lists, setLists] = useState([])

    useEffect(() => {
        getEntity({ entity: 'shopping_list' }).then(res => {
            setLists(res.data)
        }, err => {
            console.error(err)
        })
    }, [])


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
                <ScrollView style={styles.listsScrollView} contentContainerStyle={{ gap: 20 }}>
                    {lists.map(list => <ShoppingListCard key={list.id} list={list} />)}
                </ScrollView>
            </View>
        </View>
    );
}

export default GroceriesScreen

const styles = StyleSheet.create({
    shoppingMainView: {
        flex: 1,
        width: '100%',
        paddingTop: 60
    },
    listsScrollView: {
        flexDirection: 'column',
        padding: 20,
    }
})


GroceriesScreen.propTypes = {
    navigation: PropTypes.object
}