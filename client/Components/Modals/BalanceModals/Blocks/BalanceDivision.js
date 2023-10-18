import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserAvatar from '../../../../Misc/UserAvatar';

function BalanceDivision({ division, t }) {

    return (
        <View style={{ width: '100%' }}>
            <View style={{ width: '100%', alignItems: 'center', gap: 10 }}>
                <View style={{ gap: 5, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <UserAvatar user={division.payer} style={{ width: 30, height: 30, borderRadius: 5 }} />
                        <Text style={{color: 'white', fontWeight: 500}}>{division.payer.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Ionicons name='caret-down-outline' size={30} color='white' />
                        <Text style={{ fontSize: 26, fontWeight: 500, color: 'white' }}>{division.amount} €</Text>
                        <Ionicons name='caret-down-outline' size={30} color='white' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <UserAvatar user={division.receiver} style={{ width: 30, height: 30, borderRadius: 5 }} />
                        <Text style={{color: 'white', fontWeight: 500}}>{division.receiver.name}</Text>
                    </View>
                </View>
                <Text style={{ color: 'white', fontSize: 12 }}>
                    ({division.payer.name} {t('balance.cards.division.1')} {division.amount} {t('balance.cards.division.2')} {division.receiver.name})
                </Text>
            </View>
        </View>
    )
}

export default BalanceDivision