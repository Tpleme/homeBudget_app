import React, { useState } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { Divider } from 'react-native-paper'
import UserAvatar from '../../../../Misc/UserAvatar'
import CustomButton from '../../../Buttons/CustomButton'
import BalanceUsersHistory from '../BalanceUsersHistory'

function BalanceUsersDisplay({ data, t }) {
    const [openUserHistory, setOpenUserHistory] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const onOpenUserHistory = (user) => {
        setSelectedUser(user);
        setOpenUserHistory(true)
    }

    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ ...styles.userView }}>
                        <UserAvatar user={item} style={styles.userAvatar} />
                        <Text style={{ color: 'white', marginTop: 5 }}>{item.name}</Text>
                        <Text style={{ color: 'white', marginTop: 20 }}>{t('balance.cards.totalSpent')}</Text>
                        <Text style={{ color: 'tomato', fontSize: 26, fontWeight: 700 }}>{item.totalSpent} €</Text>
                        {item.expenses.length > 0 &&
                            <>
                                <CustomButton mode='text' style={{ marginTop: 10 }} label={t('balance.cards.viewHistory')} onPress={() => onOpenUserHistory(item)} />
                                <View style={styles.expensesDetailView}>
                                    <Text style={{ color: 'white', textAlign: 'center', marginBottom: 5 }}>{t('balance.cards.details')}</Text>
                                    <FlatList
                                        style={{ maxHeight: 200 }}
                                        data={item.detailedExpenses}
                                        renderItem={({ item }) => (
                                            <View style={{ marginVertical: 5 }}>
                                                <Text style={{ color: 'white', fontWeight: 500, textAlign: 'center', fontSize: 12 }}>{item.category.name} - {item.name}</Text>
                                                <Text style={{ color: 'tomato', fontWeight: 500, fontSize: 18, textAlign: 'center' }}>{item.totalAmount} €</Text>
                                            </View>
                                        )}
                                        keyExtractor={(_, index) => index}
                                        ItemSeparatorComponent={() => <Divider style={{ width: '90%', alignSelf: 'center' }} />}
                                    />
                                </View>
                            </>
                        }
                    </View>
                )}
                keyExtractor={user => user.id}
                ItemSeparatorComponent={() => <Divider style={{ width: 1, height: '90%', alignSelf: 'center' }} />}
                horizontal={true}
            />
            {selectedUser &&
                <BalanceUsersHistory open={openUserHistory} close={() => setOpenUserHistory(false)} expenses={selectedUser.expenses} t={t}/>
            }
        </>
    )
}

const styles = StyleSheet.create({
    userView: {
        width: 200,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    userAvatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    expensesDetailView: {
        width: '100%',
        marginTop: 10,
    }
})

export default BalanceUsersDisplay