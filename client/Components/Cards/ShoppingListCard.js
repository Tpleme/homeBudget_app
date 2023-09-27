import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { IconButton, Menu } from 'react-native-paper'
import ListModal from '../Modals/ShoppingList/ListModal'
import moment from 'moment'
import { deleteEntity } from '../../API/requests'

function ShoppingListCard({ list, refresh }) {
    const [showMenu, setShowMenu] = useState(false)
    const [listMode, setListMode] = useState(null)
    const [openList, setOpenList] = useState(false)

    const removeList = () => {
        deleteEntity({entity: 'shopping_list', id: list.id}).then(res => {
            console.log(res.data)
            refresh()
        }, err => {
            console.log(err)
        })
    }

    const onOpenList = mode => {
        setListMode(mode)
        setOpenList(true)
        setShowMenu(false)
    }         

    return (
        <View key={list.id} style={styles.listView}  >
            <Pressable style={styles.textWrapper} onPress={() => onOpenList('view')}>
                <Text style={styles.listCardText}>{list.name?.length ? list.name : moment(list.createdAt).format('DD MMMM YYYY - hh:mm')}</Text>
            </Pressable>
            <Menu
                visible={showMenu}
                onDismiss={() => setShowMenu(false)}
                anchor={<IconButton icon='dots-horizontal' size={20} iconColor='white' onPress={() => setShowMenu(true)} />}
            >
                <Menu.Item leadingIcon='menu-open' title='Open' onPress={() => onOpenList('view')} />
                <Menu.Item leadingIcon='pencil' title='Edit' onPress={() => onOpenList('edit')} />
                <Menu.Item leadingIcon='delete' title='Delete' onPress={() => removeList()}/>
            </Menu>
            <ListModal
                open={openList}
                close={() => setOpenList(false)}
                displayMode={listMode}
                list={list}
                refresh={refresh}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listView: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    listCardText: {
        color: 'white',
        fontSize: 16,
    },
    textWrapper: {
        // borderWidth: 1,
        // borderColor: 'white', 
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ShoppingListCard
