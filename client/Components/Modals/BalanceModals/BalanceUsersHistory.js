import React from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, FlatList } from 'react-native';
import NavigateBack from '../../../Misc/NavigateBack';
import RecordsCard from '../../Cards/RecordsCard';
import { PaperProvider, useTheme } from 'react-native-paper';

function BalanceUsersHistory({ t, ...props }) {
    const theme = useTheme()

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
            <PaperProvider theme={theme}>
                <View style={styles.modalView}>
                    <NavigateBack backFnc={props.close} />
                    <Text style={styles.title}>{t('balance.cards.expensesHistory')}</Text>
                    {props.expenses ?
                        <View style={{ width: '100%', padding: 20 }} >
                            <FlatList
                                contentContainerStyle={{ gap: 10 }}
                                data={props.expenses}
                                renderItem={({ item }) => <RecordsCard record={item} />}
                                keyExtractor={(_, index) => index}
                                ListEmptyComponent={() => <Text>{t('balance.cards.noExpenses')}</Text>}
                            />
                        </View>
                        :
                        <Text>{t('balance.cards.noInfo')}</Text>
                    }
                </View>
            </PaperProvider>
        </Modal>
    )
}

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
})

export default BalanceUsersHistory