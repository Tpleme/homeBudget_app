import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { IconButton, Menu } from 'react-native-paper'
import ListModal from '../Modals/ShoppingList/ListModal'

function ShoppingListCard({ list }) {
    const [showMenu, setShowMenu] = useState(false)
    const [openList, setOpenList] = useState(false)

    return (
        <View key={list.id} style={styles.listView}  >
            <Pressable style={styles.textWrapper} onPress={() => setOpenList(true)}>
                <Text style={styles.listCardText}>{list.name ?? list.createdAt}</Text>
            </Pressable>
            <Menu
                visible={showMenu}
                onDismiss={() => setShowMenu(false)}
                anchor={<IconButton icon='dots-horizontal' size={20} iconColor='white' onPress={() => setShowMenu(true)} />}
            >
                <Menu.Item leadingIcon='menu-open' title='Open'  />
                <Menu.Item leadingIcon='pencil' title='Edit' />
                <Menu.Item leadingIcon='delete' title='Delete' />
            </Menu>
            <ListModal open={openList} close={() => setOpenList(false)} list={list} />
        </View>
    )
}

const styles = StyleSheet.create({
    listView: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        height: 70,
        borderRadius: 20,
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
