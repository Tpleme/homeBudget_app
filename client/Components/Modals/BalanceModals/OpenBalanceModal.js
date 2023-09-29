import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import NavigateBack from '../../../Misc/NavigateBack';
import { getOpenBalance } from '../../../API/requests';
import moment from 'moment';
import UserAvatar from '../../../Misc/UserAvatar';
import BalanceUsersHistory from './BalanceUsersHistory';
import CustomButton from '../../Buttons/CustomButton';


function OpenBalanceModal({ data, ...props }) {
    const [balanceData, setBalanceData] = useState(null)
    const [openUserHistory, setOpenUserHistory] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const theme = useTheme()

    useEffect(() => {
        if (props.open) {
            getOpenBalance({ data }).then(res => {
                // console.log(res.data)
                setBalanceData(res.data)
                test()
            }, err => {
                console.log(err)
            })
        }
    }, [props.open])

    const onOpenUserHistory = (user) => {
        setSelectedUser(user);
        setOpenUserHistory(true)
    }

    const test = () => {
        const users = [
            { name: 'user 1', value: 150.35 },
            { name: 'user 2', value: 85.25 },
            { name: 'user 3', value: 126.35 },
        ]

        const total = users.reduce((acc, obj) => acc + obj.value, 0) / users.length
        console.log('total amount: ' + total.toFixed(2))

        const difference = users.map(user => ({ ...user, own: (total - user.value).toFixed(2) }))
        console.log(difference)

        difference.forEach(user => {
            if (parseFloat(user.own) < 0) {
                console.log(parseFloat(user.own))
                // difference.forEach(el => {
                //     if(parseFloat(el.own) > 0) {
                //         user.own += el.own
                //         el.own -= user.own
                //     }
                // })
            }
        })

        console.log(difference)

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
                <NavigateBack backFnc={props.close} />
                <Text style={styles.title}>Current opened balance</Text>
                {balanceData &&
                    <ScrollView style={styles.mainView} contentContainerStyle={{ gap: 10 }}>
                        <View style={styles.topView}>
                            <Text style={{ color: 'tomato' }}>From</Text>
                            <Text style={{ color: 'white', fontSize: 16 }}>{moment(balanceData.data.start_date).format('DD MMM YYYY - hh:mm')}</Text>
                            <Text style={{ ...styles.amountText, fontWeight: 700 }}>{balanceData.data.total} €</Text>
                        </View>
                        <FlatList
                            data={balanceData.dataByUsers}
                            renderItem={({ item }) => (
                                <View style={{ ...styles.userView }}>
                                    <UserAvatar user={item} style={styles.userAvatar} />
                                    <Text style={{ color: 'white', marginTop: 5 }}>{item.name}</Text>
                                    <Text style={{ color: 'white', marginTop: 20 }}>Total Spent:</Text>
                                    <Text style={{ color: 'tomato', fontSize: 26, fontWeight: 700 }}>{item.totalSpent} €</Text>
                                    <CustomButton mode='text' style={{ marginTop: 10 }} label='View history' onPress={() => onOpenUserHistory(item)} />
                                </View>
                            )}
                            keyExtractor={user => user.id}
                            ItemSeparatorComponent={() => <Divider style={{ width: 1, height: '80%', alignSelf: 'center' }} />}
                            horizontal={true}
                        />
                        <View style={{ ...styles.divisionView, backgroundColor: theme.colors.primary }}>

                        </View>
                    </ScrollView>
                }
            </View>
            <BalanceUsersHistory open={openUserHistory} close={() => setOpenUserHistory(false)} user={selectedUser} />
        </Modal>
    )
}

export default OpenBalanceModal


const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#202020',
        paddingTop: 20,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20
    },
    mainView: {
        flex: 1,
        width: '100%',
        padding: 10
    },
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
    userView: {
        width: 200,
        alignItems: 'center',
        padding: 20
    },
    userAvatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    divisionView: {
        width: '100%',
        minHeight: 150,
        borderRadius: 10,
    }
});