import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import NavigateBack from '../../../Misc/NavigateBack';
import { getOpenBalance } from '../../../API/requests';
import BalanceUsersDisplay from './Blocks/BalanceUsersDisplay';
import BalanceDivision from './Blocks/BalanceDivision';
import BalanceTopInfo from './Blocks/BalanceTopInfo';
import CategoriesPieChart from './Blocks/CategoriesPieChart';
import UsersSpentPieChart from './Blocks/UsersSpentPieChart';

function OpenBalanceModal({ data, t, ...props }) {
    const [balanceData, setBalanceData] = useState(null)
    const [divisionText, setDivisionText] = useState([])

    const theme = useTheme()

    useEffect(() => {
        if (props.open) {
            getOpenBalance({ data }).then(res => {
                setBalanceData(res.data)
                setDivisionText(getEqualDivision(res.data.dataByUsers))
            }, err => {
                console.log(err)
            })
        }
    }, [props.open])


    const getEqualDivision = (users) => {

        const total = users.reduce((acc, obj) => acc + obj.totalSpent, 0) / users.length

        const difference = users.map(user => ({ ...user, own: parseFloat((total - user.totalSpent).toFixed(2)) }))
        const stringArray = []

        difference.forEach(user => {
            if (user.own > 0) {
                const userOwedMoney = difference.filter(el => el.own < 0)

                userOwedMoney.forEach(userOwed => {
                    let remaining = user.own + userOwed.own;

                    stringArray.push({
                        payer: user,
                        amount: user.own >= Math.abs(userOwed.own) ? (user.own - remaining).toFixed(2) : user.own,
                        receiver: userOwed
                    })
                })
            }
        })

        return stringArray
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
                <Text style={styles.title}>{t('balance.cards.opened')}</Text>
                {balanceData &&
                    <ScrollView style={styles.mainView} contentContainerStyle={{ gap: 10 }}>
                        <BalanceTopInfo balanceData={balanceData} t={t} />
                        <View style={{ ...styles.divisionView, backgroundColor: theme.colors.primary }}>
                            {divisionText.map((division, index) => <BalanceDivision key={index} division={division} t={t} />)}
                        </View>
                        <BalanceUsersDisplay data={balanceData.dataByUsers} t={t} />
                        <Divider />
                        <UsersSpentPieChart users={balanceData.dataByUsers} t={t} />
                        <Divider />
                        <CategoriesPieChart records={balanceData.groupedExpensesByCategory} t={t} />
                    </ScrollView>
                }
            </View>
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
        padding: 10,
    },
    divisionView: {
        width: '100%',
        height: 'fit-content', //TODO: (ADVICE) "fit-content" is not a valid dimension. Dimensions must be a number, "auto", or a string suffixed with "%".
        borderRadius: 10,
        padding: 10,
    },
});