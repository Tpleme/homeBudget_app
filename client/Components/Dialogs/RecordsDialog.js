import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import moment from 'moment'
import { useTheme } from 'react-native-paper';

function RecordsDialog({ open, close, record }) {
    const theme = useTheme()

    return (
        <Portal>
            <Dialog visible={open} onDismiss={close} style={{ backgroundColor: theme.colors.surfaceVariant, ...styles.dialog }}>
                <Text style={styles.title}>{record.value} € - {record.payer.name}</Text>
                <Text style={styles.subtitle}>{record.subcategory.category.name} - {record.subcategory.name}</Text>
                <Text style={styles.date}>{moment(record.date).format('DD MMMM YYYY hh:mm')}</Text>
                <Text variant="bodyMedium">Created At: {moment(record.createdAt).format('DD MMMM YYYY hh:mm')}</Text>
                <Text variant="bodyMedium">Created By: {record.creator.name}</Text>
                <View style={{ padding: 10 }}>
                    <Button onPress={close}>close</Button>
                </View>
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
    }
})