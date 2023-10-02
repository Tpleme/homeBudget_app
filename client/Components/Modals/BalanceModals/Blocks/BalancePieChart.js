import React from 'react'
import { View, Text } from 'react-native'
import { PieChart } from "react-native-gifted-charts";

function BalancePieChart({ records }) {
    const pieData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
    ];

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Expenses by Categories
            </Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <PieChart
                    data={pieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    focusOnPress
                    onPress={(item, index) => console.log(item, index)}
                    radius={120}
                    innerRadius={80}
                    innerCircleColor={'#202020'}
                    centerLabelComponent={() => {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text
                                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                    47%
                                </Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>Excellent</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    )
}

export default BalancePieChart