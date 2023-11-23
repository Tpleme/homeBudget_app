import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import RecordsCard from '../Cards/RecordsCard';
import { useTranslation } from 'react-i18next';

function Activity({ onViewMore, records }) {
    const { t } = useTranslation()

    return (
        <View style={styles.activityView}>
            <View style={styles.topView}>
                <Text style={styles.topTitle}>{t('homeScreen.activity.title')}</Text>
                <Text onPress={onViewMore} style={styles.topButton}>{t('homeScreen.activity.button')}</Text>
            </View>
            {records.length > 0 ?
                <View style={styles.activityItens}>
                    {records.map((record, index) => (
                        <RecordsCard key={index} record={record} />
                    ))}
                </View>
                :
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText}>
                        {`Sem dados de despesas para mostrar.\n\nAssim que adicionar uma nova despesa, esta irá aparecer aqui`}
                    </Text>
                </View>
            }
        </View>
    )
}

export default Activity


const styles = StyleSheet.create({
    activityView: {
        width: '100%',
        padding: 10,
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItens: 'center',
    },
    topTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    topButton: {
        color: 'tomato',
        fontSize: 13
    },
    activityItens: {
        marginTop: 10,
        rowGap: 12,
    },
    noDataView: {
        width: '100%',
        borderColor: 'tomato',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10
    },
    noDataText: {
        color: 'grey',
        textAlign: 'center',
    }
});