import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomButton from '../../../Buttons/CustomButton'
import moment from 'moment'
import BalanceUsersHistory from '../BalanceUsersHistory'

function BalanceTopInfo({ balanceData }) {
    const [openHistory, setOpenHistory] = useState(false)

    return (
        <View style={styles.topView}>
            <Text style={{ color: 'tomato' }}>From</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>{moment(balanceData.data.start_date).format('DD MMM YYYY - hh:mm')}</Text>
            <Text style={{ color: 'tomato' }}>To</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>{moment(balanceData.data.end_date).format('DD MMM YYYY - hh:mm')}</Text>
            <Text style={{ ...styles.amountText, fontWeight: 700 }}>{balanceData.data.total} €</Text>
            <CustomButton mode='text' style={{ marginTop: 10 }} label='View history' onPress={() => setOpenHistory(true)}/>
            <BalanceUsersHistory open={openHistory} close={() => setOpenHistory(false)} expenses={balanceData.records} />
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        borderWidth: 1,
        borderColor: 'tomato',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    amountText: {
        color: 'tomato',
        fontSize: 28,
        marginTop: 10
    },
})

export default BalanceTopInfo