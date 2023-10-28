import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import { deleteEntity } from '../../API/requests';
import { showMessage } from 'react-native-flash-message'


function DeleteRecordDialog({ open, close, record, closeAndRefresh }) {
    const theme = useTheme()
    const { t } = useTranslation()

    const deleteRecord = () => {
        deleteEntity({entity: 'records', id: record.id}).then(res => {
            console.log(res.data)
            showMessage({message: res.data, type: 'success'})
            closeAndRefresh()
        }, err => {
            showMessage({message: 'Error eliminating records, please try again later', type: 'danger'})
            console.error(err)
        })
    }

    return (
        <Portal>
            <Dialog visible={open} onDismiss={close} style={{ backgroundColor: theme.colors.surfaceVariant, ...styles.dialog }}>
                <Text style={{textAlign: 'center'}}>{t('records.delete.text')}</Text>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onPress={close}>{t('common.close')}</Button>
                    <Button onPress={deleteRecord}>{t('common.delete')}</Button>
                </View>
            </Dialog>
        </Portal>
    )
}

export default DeleteRecordDialog

const styles = StyleSheet.create({
    dialog: {
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
})