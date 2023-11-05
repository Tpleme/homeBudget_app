import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import moment from 'moment'
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import DeleteRecordDialog from './DeleteRecordDialog';
import EditRecordDialog from './EditRecordDialog';
import { StoreContext } from '../../Context/Store/index';

function RecordsDialog({ open, close, record }) {
    const theme = useTheme()
    const { t } = useTranslation()
    const [showEditRecord, setShowEditRecord] = useState(false)
    const [showDeleteRecord, setShowDeleteRecord] = useState(false)
    const [storeState, dispatch] = useContext(StoreContext)

    const closeAndRefresh = () => {
        close()
        dispatch({ type: 'setRefreshRecords' });
    }

    const closeAfterEdit = () => {
        setShowEditRecord(false)
        close()
        dispatch({ type: 'setRefreshRecords' });
    }

    return (
        <Portal>
            <Dialog visible={open} onDismiss={close} style={{ backgroundColor: theme.colors.surfaceVariant, ...styles.dialog }}>
                <Text style={styles.title}>{record.value} € - {record.payer.name}</Text>
                <Text style={styles.subtitle}>{record.subcategory.category.name} - {record.subcategory.name}</Text>
                <Text style={styles.date}>{moment(record.date).format('DD MMMM YYYY hh:mm')}</Text>
                <Text variant="bodyMedium">{t('common.createdAt')}: {moment(record.createdAt).format('DD MMMM YYYY hh:mm')}</Text>
                <Text variant="bodyMedium">{t('common.createdBy')}: {record.creator.name}</Text>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onPress={close}>{t('common.close')}</Button>
                    <Button onPress={() => setShowEditRecord(true)}>{t('common.edit')}</Button>
                    <Button onPress={() => setShowDeleteRecord(true)}>{t('common.delete')}</Button>
                </View>
                <DeleteRecordDialog open={showDeleteRecord} close={() => setShowDeleteRecord(false)} record={record} closeAndRefresh={closeAndRefresh} />
                <EditRecordDialog open={showEditRecord} close={() => setShowEditRecord(false)} record={record} closeAfterEdit={closeAfterEdit} />
            </Dialog>
        </Portal>
    )
}

export default RecordsDialog

const styles = StyleSheet.create({
    dialog: {
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 500,
    },
    subtitle: {
        fontWeight: 500,
        color: 'tomato'
    },
    date: {
        marginBottom: 20,
    },
})