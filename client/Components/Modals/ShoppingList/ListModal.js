import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Checkbox, FAB } from 'react-native-paper'
import CustomButton from '../../Buttons/CustomButton'
import AddItemDialog from './AddItemDialog';


function ListModal(props) {
    const [itens, setItens] = useState([])
    const [openAddDialog, setOpenAddDialog] = useState(false)

    useEffect(() => {
        setItens(JSON.parse(props.list.itens))
    }, [])

    const checkItem = (item, index) => {
        const newArray = [...itens];

        newArray[index].checked = !item.checked
        setItens(newArray)
    }

    const addItem = (data) => {
        console.log(data)
        setItens(prev => [...prev, data])
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
            <View style={styles.modalView}>
                <Text style={styles.title}>{props.list.name ?? props.list.createdAt}</Text>
                <View style={styles.scrollViewWrapper}>
                    <ScrollView style={styles.listItens} contentContainerStyle={{ gap: 10, paddingBottom: 75 }}>
                        {itens.map((el, index) => (
                            <View key={index} style={{ ...styles.itemView, opacity: el.checked ? 0.5 : 1 }}>
                                <Checkbox status={el.checked ? 'checked' : 'unchecked'} onPress={() => checkItem(el, index)} />
                                <Text numberOfLines={1} style={styles.itemName}>{el.name}</Text>
                                <Text style={{ marginLeft: 'auto', color: 'white'}}>{el.quantity}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <FAB mode='flat' icon='plus' style={styles.addButton} onPress={() => setOpenAddDialog(true)} />
                </View>
                <View style={{ width: '100%', gap: 10 }}>
                    <CustomButton label='Save' />
                    <CustomButton label='Cancel' color='darkgrey' onPress={props.close} />
                </View>
            </View>
            <AddItemDialog open={openAddDialog} close={() => setOpenAddDialog(false)} onAdd={addItem} />
        </Modal>
    )
}

export default ListModal

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalView: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#202020',
        height: '100%',
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
    }

});