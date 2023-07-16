import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import WomanPortrait from '../../assets/placeholders/woman_portrait.jpeg'

function Activity({ data, onViewMore }) {
    return (
        <View style={styles.activityView}>
            <View style={styles.topView}>
                <Text style={styles.topTitle}>Recent Activity</Text>
                <Text onPress={onViewMore} style={styles.topButton}>View all</Text>
            </View>
            <View style={styles.activityItens}>
                {data.map((activity, index) => (
                    <View key={index} style={styles.activityItem}>
                        <View style={styles.leftView}>
                            <View style={styles.avatar}>
                                <Image alt='Leandro' source={WomanPortrait} style={styles.image} />
                                <Text numberOfLines={1} style={styles.userName}>{activity.user}</Text>
                            </View>
                            <View style={styles.bottomView}>
                                <Text numberOfLines={1} style={styles.catText}>{activity.cat}</Text>
                                <Text numberOfLines={1} style={styles.dateText}>{activity.date}</Text>
                            </View>
                        </View>
                        <Text numberOfLines={1} style={styles.amountText}>{activity.amount} €</Text>
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
        fontWeight: 700,
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
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        alignSelf:'flex-end'
    },
    amountText: {
        color: 'tomato',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 700,
        alignSelf: 'center'
    }
});