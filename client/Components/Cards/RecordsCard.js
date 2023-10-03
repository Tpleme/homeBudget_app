import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import UserAvatar from '../../Misc/UserAvatar'
import { useTheme } from 'react-native-paper'
import moment from 'moment'
import RecordsDialog from '../Dialogs/RecordsDialog'

function RecordsCard({ record }) {
    const theme = useTheme()
    const [openMoreInfo, setOpenMoreInfo] = useState(false)

    return (
        <Pressable style={styles.recordCard} onPress={() => setOpenMoreInfo(true)}>
            <View style={styles.leftView}>
                <View style={styles.avatar}>
                    <UserAvatar user={record.payer} style={styles.image} />
                    <Text numberOfLines={1} style={styles.userName}>{record.payer.name}</Text>
                </View>
                <View style={styles.bottomView}>
                    <Text numberOfLines={1} style={{ color: theme.colors.primary }}>{record.subcategory.name}</Text>
                    <Text numberOfLines={1} style={styles.dateText}>{moment(record.date).format('DD MMM YYYY hh:mm')}</Text>
                </View>
            </View>
            <Text numberOfLines={1} style={{ color: theme.colors.primary, ...styles.amountText }}>{record.value} €</Text>
            <RecordsDialog open={openMoreInfo} close={() => setOpenMoreInfo(false)} record={record} />
        </Pressable>
    )
}

export default RecordsCard

const styles = StyleSheet.create({
    recordCard: {
        backgroundColor: '#2a2a2a',
        elevation: 2,
        borderRadius: 5,
        flexDirection: 'row',
        alignItens: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    leftView: {
        flex: 1,
        gap: 5,
    },
    avatar: {
        flexDirection: 'row',
        alignItens: 'center',
        gap: 5,
    },
    image: {
        height: 25,
        width: 25,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    userName: {
        color: 'white',
        fontSize: 17,
        alignSelf: 'center'
    },
    bottomView: {
        flexDirection: 'row',
        gap: 10,
    },
    dateText: {
        color: 'grey',
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    amountText: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'center'
    },
});