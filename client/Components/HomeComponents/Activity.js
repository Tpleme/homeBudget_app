import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { getEntity } from '../../API/requests';
import RecordsCard from '../Cards/RecordsCard';

//TODO: tentar atualizar esta lista quando é criado um novo record
function Activity({ onViewMore }) {
    const [data, setData] = useState([])

    useEffect(() => {
        getEntity({ entity: 'records', query: { limit: 10 } }).then(res => {
            setData(res.data)
        }, err => {
            console.log(err)
        })
    }, [])

    return (
        <View style={styles.activityView}>
            <View style={styles.topView}>
                <Text style={styles.topTitle}>Recent Activity</Text>
                <Text onPress={onViewMore} style={styles.topButton}>View all</Text>
            </View>
            <View style={styles.activityItens}>
                {data.map((record, index) => (
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