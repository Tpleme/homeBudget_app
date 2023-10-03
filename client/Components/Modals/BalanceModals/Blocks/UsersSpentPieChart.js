import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import { chartColors } from '../../../../utils';

function UsersSpentPieChart({ users }) {
    const [data, setData] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)


    useEffect(() => {
        const sortedUsers = users.sort((a, b) => (a.totalSpent < b.totalSpent) ? 1 : -1)

        const mappedArray = sortedUsers.map((el, index) => ({
            ...el,
            value: el.totalSpent,
            focused: index === 0,
            ...chartColors[index],
        }))

        setSelectedUser(mappedArray[0])

        setData(mappedArray)

    }, [users])

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Amount spent by User
            </Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
                {data &&
                    <PieChart
                        data={data}
                        donut
                        sectionAutoFocus
                        focusOnPress
                        onPress={(item) => setSelectedUser(item)}
                        radius={120}
                        innerRadius={80}
                        innerCircleColor={'#202020'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                        {selectedUser?.value} €
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>{selectedUser?.name}</Text>
                                </View>
                            );
                        }}
                    />
                }
            </View>
            {data && renderLegendComponent(data)}
        </View>
    )
}

const renderDot = color => {
    return (
        <View
            style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: color,
                marginRight: 10,
            }}
        />
    );
};

const renderLegendComponent = (users) => {
    return (
        <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            {users.map(user => (
                <View
                    key={user.id}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 120,
                        marginRight: 20,
                    }}>
                    {renderDot(user.color)}
                    <Text style={{ color: 'white' }}>{user.name}</Text>
                </View>
            ))}
        </View>
    );
};

export default UsersSpentPieChart