import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu, IconButton } from 'react-native-paper'
import OpenBalanceModal from '../Modals/BalanceModals/OpenBalanceModal';
import { useUserInfo } from '../../Hooks/useUser';
import { createEntity } from '../../API/requests';
import { showMessage } from 'react-native-flash-message'

function OpenBalanceCard({ data, refresh, t }) {
    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const { userInfo } = useUserInfo()

    const closeBalance = () => {
        setShowMenu(false)

        createEntity({ entity: 'balance', data: { ...data, end_date: new Date(), createdById: userInfo.id } }).then(res => {
            showMessage({ message: res.data, type: 'success' })
            refresh()
        }, err => {
            console.log(err)
            showMessage({ message: 'Error closing balance', type: 'danger' })
        })

    }

    return (
        <View style={styles.listView} >
            <View style={{ ...styles.closedView, backgroundColor: '#689f38' }}>
                <Ionicons name='lock-open-outline' size={20} color='white' />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{t('balance.cards.opened')}</Text>
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
                    {data.total > 0 ?
                        <>
                            <Menu.Item leadingIcon='menu-open' title={t('balance.cards.openInfo')} onPress={() => { setOpenInfoModal(true); setShowMenu(false) }} />
                            <Menu.Item leadingIcon='lock' title={t('balance.cards.closeBalance')} onPress={closeBalance} />
                        </>
                        :
                        <Menu.Item title='No records on open balance'/>
                    }
                </Menu>
            </View>
            <View style={styles.infoView}>
                <View style={styles.textView}>
                    <Text style={styles.infoText}>{t('common.from')}: {moment(data.start_date).format('DD MMM YYYY hh:mm')}</Text>
                    <Text style={styles.infoText}>{t('common.to')}: {t('balance.cards.today')}</Text>
                </View>
                <Text style={styles.totalText}>{data.total} €</Text>
            </View>
            <OpenBalanceModal
                open={openInfoModal}
                close={() => setOpenInfoModal(false)}
                data={data}
                t={t}
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