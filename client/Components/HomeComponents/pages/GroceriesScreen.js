import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StatusBar, StyleSheet, ScrollView, Pressable } from 'react-native';
import NavigateBack from '../../../Misc/NavigateBack';
import { getEntity } from '../../../API/requests'

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
                    {lists.map(list => (
                        <Pressable 
                        key={list.id} 
                        style={styles.listView} 
                        onLongPress={() => console.log('aparecer context menu')}
                        // em vez de longpress podemos colocar 3 pontinhos para abrir um menu
                        onPress={() => console.log('abrir lista')}
                        >
                            <Text style={styles.listCardText}>{list.name ?? list.createdAt}</Text>
                        </Pressable>
                    ))}
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
        borderWidth: 1,
        borderColor: 'red'
    },
    listView: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        height: 70,
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    listCardText: {
        color: 'white',
        fontSize: 16,
    }
})


GroceriesScreen.propTypes = {
    navigation: PropTypes.object
}