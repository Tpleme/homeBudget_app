import React, { useState } from 'react'
import {  View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import BalanceModal from '../Modals/BalanceModals/BalanceModal'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu, IconButton } from 'react-native-paper'

function OpenBalanceCard({ balance }) {
    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const closeBalance = () => {
        console.log('closing balance')
    }

    return (
        <View style={styles.listView} >
            <View style={{ ...styles.closedView, backgroundColor: '#689f38' }}>
                <Ionicons name='lock-open-outline' size={20} color='white' />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Opened Balance</Text>
                <Menu
                    visible={showMenu}
                    onDismiss={() => setShowMenu(false)}
                    anchor={
                        <IconButton
                            icon='dots-horizontal'
                            size={20}
                            iconColor='white'
                            onPress={() => setShowMenu(true)}
                        />
                    }
                >
                    <Menu.Item leadingIcon='menu-open' title='Open Info' onPress={() => openInfoModal(true)} />
                    <Menu.Item leadingIcon='lock' title='Close Balance' onPress={closeBalance} />
                </Menu>
            </View>
            <View style={styles.infoView}>
                <View style={styles.textView}>
                    <Text style={styles.infoText}>To: today</Text>
                    <Text style={styles.infoText}>From: {moment().format('DD MMM YYYY hh:mm')}</Text>
                </View>
                <Text style={styles.totalText}>{10000} €</Text>
            </View>
            <BalanceModal
                open={openInfoModal}
                close={() => setOpenInfoModal(false)}
            // balance={balance}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listView: {
        width: '100%',
        backgroundColor: '#373737',
        height: 'fit-content',
        borderRadius: 10,
        overflow: 'hidden'
    },
    listCardText: {
        color: 'white',
        fontSize: 16,
    },
    closedView: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoView: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },
    textView: {
        flex: 1
    },
    infoText: {
        color: 'white'
    },
    totalText: {
        color: 'tomato',
        fontSize: 20
    }
})

export default OpenBalanceCard