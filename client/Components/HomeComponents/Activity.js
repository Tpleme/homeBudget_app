import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { getEntity } from '../../API/requests';
import UserAvatar from '../../Misc/UserAvatar';
import moment from 'moment'

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
                    <View key={index} style={styles.activityItem}>
                        <View style={styles.leftView}>
                            <View style={styles.avatar}>
                                <UserAvatar user={record.payer} style={styles.image} />
                                <Text numberOfLines={1} style={styles.userName}>{record.payer.name}</Text>
                            </View>
                            <View style={styles.bottomView}>
                                <Text numberOfLines={1} style={styles.catText}>{record.subcategory.name}</Text>
                                <Text numberOfLines={1} style={styles.dateText}>{moment(record.createdAt).format('DD MMM YYYY hh:mm')}</Text>
                            </View>
                        </View>
                        <Text numberOfLines={1} style={styles.amountText}>{record.value} €</Text>
                    </View>
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
        rowGap: 10,
    },
    activityItem: {
        backgroundColor: '#2a2a2a',
        elevation: 2,
        borderRadius: 5,
        flexDirection: 'row',
        alignItens: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    leftView: {
        flex: 1,
        gap: 5,
    },
    avatar: {
        flexDirection: 'row',
        alignItens: 'center',
        gap: 5,
    },
    image: {
        height: 25,
        width: 25,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    userName: {
        color: 'white',
        fontSize: 17,
        alignSelf: 'center'
    },
    bottomView: {
        flexDirection: 'row',
        gap: 10,
    },
    catText: {
        color: 'tomato',
    },
    dateText: {
        color: 'grey',
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    amountText: {
        color: 'tomato',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'center'
    }
});