import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import ClosedBalanceModal from '../Modals/BalanceModals/ClosedBalanceModal'
import { useTheme } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';

function ClosedBalanceCard({ balance, t }) {
    const [openInfoModal, setOpenInfoModal] = useState(false)
    const theme = useTheme()

    return (
        <Pressable style={styles.listView} onPress={() => setOpenInfoModal(true)} >
            <View style={{ ...styles.closedView, backgroundColor: theme.colors.onTertiary }}>
                <Ionicons style={{position: 'absolute', left: 10}} name='lock-closed-outline' size={20} color='white' />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{t('balance.cards.closed')}</Text>
            </View>
            <View style={styles.infoView}>
                <View style={styles.textView}>
                    <Text style={styles.infoText}>{t('common.to')}: {moment(balance.end_date).format('DD MMM YYYY HH:mm')}</Text>
                    <Text style={styles.infoText}>{t('common.from')}: {moment(balance.start_date).format('DD MMM YYYY HH:mm')}</Text>
                </View>
                <Text style={styles.totalText}>{balance.total} €</Text>
            </View>
            <ClosedBalanceModal
                open={openInfoModal}
                close={() => setOpenInfoModal(false)}
                data={balance}
                t={t}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listView: {
        width: '100%',
        backgroundColor: '#373737',
        height: 'fit-content', //TODO: (ADVICE) "fit-content" is not a valid dimension. Dimensions must be a number, "auto", or a string suffixed with "%".
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
        paddingVertical: 15,
        justifyContent: 'center'
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

export default ClosedBalanceCard
