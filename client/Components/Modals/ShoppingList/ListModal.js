import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Checkbox, FAB, IconButton, Menu, PaperProvider, useTheme } from 'react-native-paper'
import CustomButton from '../../Buttons/CustomButton'
import AddItemDialog from './AddItemDialog';
import EditItemDialog from './EditItemDialog';
import { editEntity } from '../../../API/requests';
import NavigateBack from '../../../Misc/NavigateBack';
import { TextInput } from '../../Inputs/TextInputs';
import moment from 'moment'


function ListModal(props) {
    const [displayMode, setDisplayMode] = useState(null)
    const [itens, setItens] = useState([])
    const [listName, setListName] = useState('')
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const theme = useTheme()

    useEffect(() => {
        if (props.open) {
            setListName(props.list.name?.length ? props.list.name : moment(props.list.createdAt).format('DD MMMM YYYY - hh:mm'))
            setDisplayMode(props.displayMode)
            if (props.list.itens) {
                setItens(JSON.parse(props.list.itens))
            }
        }
    }, [props.list, props.open, props.displayMode])

    const onSaveList = () => {
        const stringItens = JSON.stringify(itens)

        editEntity({
            entity: 'shopping_list',
            id: props.list.id,
            data: { ...props.list, name: listName, itens: stringItens }
        }).then(res => {
            //TODO: add snackbar feedback
            console.log(res.data)
            props.refresh()
            setDisplayMode('view')
        }, err => {
            console.log(err)
        })
    }

    const onCancel = () => {
        if (props.list.itens) {
            setItens(JSON.parse(props.list.itens))
        }
        setListName(props.list.name ?? moment(props.list.createdAt).format('DD MMMM YYYY - hh:mm'))
        setDisplayMode('view');
    }

    const checkItem = (item, index) => {
        const newArray = [...itens];

        newArray[index].checked = !item.checked
        setItens(newArray)
    }

    const addItem = data => {
        setItens(prev => [...prev, data])
    }

    const editItem = (data) => {
        const newArray = [...itens];

        newArray[data.index] = data.item
        setItens(newArray)
    }

    const removeItem = (data, index) => {
        const newArray = [...itens];

        newArray.splice(index, 1)
        setItens(newArray)
    }

    const selectActiveItem = item => {
        setSelectedItem(item)
        setOpenEditDialog(true)
    }

    return (
        <Modal
            animationIn="slideInUp"
            animationOut='slideOutDown'
            style={styles.modal}
            isVisible={props.open}
            backdropOpacity={1}
            onBackButtonPress={() => {
                props.close();
            }}
        >
            <PaperProvider theme={theme}>
                {displayMode === 'view' &&
                    <NavigateBack backFnc={() => props.close()} />
                }
                <View style={styles.modalView}>
                    {displayMode === 'view' ?
                        <Text style={styles.title}>{listName}</Text>
                        :
                        <TextInput value={listName} onChange={setListName} />
                    }
                    <View style={styles.scrollViewWrapper}>
                        <ScrollView style={styles.listItens} contentContainerStyle={{ gap: 10, paddingBottom: 75 }}>
                            {itens.length > 0 ? itens.map((el, index) => (
                                <ItemView
                                    key={index}
                                    el={el}
                                    index={index}
                                    checkItem={checkItem}
                                    removeItem={() => removeItem(el, index)}
                                    editItem={() => selectActiveItem({ data: el, index })}
                                    displayMode={displayMode}
                                />
                            )) :
                                <Text style={styles.noItensText}>Your shopping list is empty, start by adding a new product by clicking on the button with a plus sign on the bottom right side</Text>
                            }
                        </ScrollView>
                        {displayMode === 'edit' ?
                            <FAB size='small' mode='flat' icon='plus' style={styles.addButton} onPress={() => setOpenAddDialog(true)} />
                            :
                            <FAB size='small' mode='flat' icon='pencil' style={styles.editButton} onPress={() => setDisplayMode('edit')} />
                        }
                    </View>
                    {displayMode === 'edit' &&
                        <View style={{ width: '100%', gap: 10 }}>
                            <CustomButton label='Save' onPress={onSaveList} />
                            <CustomButton label='Cancel' color='darkgrey' onPress={onCancel} />
                        </View>
                    }
                </View>
                <AddItemDialog open={openAddDialog} close={() => setOpenAddDialog(false)} onAdd={addItem} />
                {selectedItem &&
                    <EditItemDialog open={openEditDialog} close={() => setOpenEditDialog(false)} onSubmit={editItem} item={selectedItem} />
                }
            </PaperProvider>
        </Modal>
    )
}

export default ListModal


const ItemView = ({ el, index, checkItem, removeItem, editItem, displayMode }) => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <View style={{ ...styles.itemView, opacity: el.checked ? 0.5 : 1 }}>
            {displayMode === 'view' &&
                <Checkbox status={el.checked ? 'checked' : 'unchecked'} onPress={() => checkItem(el, index)} />
            }
            <Text numberOfLines={1} style={styles.itemName}>{el.name}</Text>
            <Text style={{ marginLeft: 'auto', color: 'white', paddingRight: 10 }}>{el.quantity} {el.measure}</Text>
            {displayMode === 'edit' &&
                <Menu
                    visible={showMenu}
                    onDismiss={() => setShowMenu(false)}
                    anchor={<IconButton icon='dots-vertical' size={20} style={{ margin: 0 }} onPress={() => setShowMenu(true)} />}
                >
                    <Menu.Item leadingIcon='pencil' title='Edit' onPress={() => { setShowMenu(false); editItem() }} />
                    <Menu.Item leadingIcon='delete' title='Delete' onPress={removeItem} />
                </Menu>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalView: {
        flex: 1,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#202020',
        padding: 20,
        alignItems: 'center',
        gap: 20
    },
    title: {
        color: 'white',
        fontSize: 18
    },
    scrollViewWrapper: {
        width: '100%',
        flex: 1,
    },
    listItens: {
        width: '100%',
        padding: 10,
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#373737',
        paddingHorizontal: 10,
        borderRadius: 10
    },
    itemName: {
        flex: 1,
        color: 'white',
        marginRight: 10
    },
    addButton: {
        position: 'absolute',
        bottom: -10,
        right: 0,
    },
    editButton: {
        position: 'absolute',
        bottom: -10,
        right: -10,
    },
    noItensText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    }

});