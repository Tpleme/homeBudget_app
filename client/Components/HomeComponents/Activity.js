import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import RecordsCard from '../Cards/RecordsCard';

function Activity({ onViewMore, records }) {

    return (
        <View style={styles.activityView}>
            <View style={styles.topView}>
                <Text style={styles.topTitle}>Recent Activity</Text>
                <Text onPress={onViewMore} style={styles.topButton}>View all</Text>
            </View>
            <View style={styles.activityItens}>
                {records.map((record, index) => (
                   <RecordsCard key={index} record={record} /> 
                ))}
            </View>
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
    }
});