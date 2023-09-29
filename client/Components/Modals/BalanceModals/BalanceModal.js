import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View } from 'react-native';
import NavigateBack from '../../../Misc/NavigateBack';
import { getEntity } from '../../../API/requests';

function BalanceModal({ balance, ...props }) {

    useEffect(() => {
        if (props.open) {
            getEntity({ entity: 'balance', id: balance.id }).then(res => {
                console.log(res.data)
            }, err => {
                console.log(err)
            })
        }
    }, [props.open])

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
            </View>

        </Modal>
    )
}

export default BalanceModal


const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalView: {
        flex: 1,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#202020',
        padding: 20,
        alignItems: 'center',
        gap: 20
    },
});