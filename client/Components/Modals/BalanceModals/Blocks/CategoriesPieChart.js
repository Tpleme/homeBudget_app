import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import { chartColors } from '../../../../utils';

function CategoriesPieChart({ records }) {
    const [data, setData] = useState(null)
    const [selectedRecord, setSelectedRecord] = useState(null)


    useEffect(() => {
        const sortedRecords = records.sort((a, b) => (a.totalAmount < b.totalAmount) ? 1 : -1)

        const mappedArray = sortedRecords.map((el, index) => ({
            ...el,
            value: el.totalAmount,
            focused: index === 0,
            ...chartColors[index],
        }))
        
        setSelectedRecord(mappedArray[0])

        setData(mappedArray)

    }, [records])

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Expenses by Categories
            </Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
                {data &&
                    <PieChart
                        data={data}
                        donut
                        sectionAutoFocus
                        focusOnPress
                        onPress={(item) => setSelectedRecord(item)}
                        radius={120}
                        innerRadius={80}
                        innerCircleColor={'#202020'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                        {selectedRecord?.value} €
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>{selectedRecord?.name}</Text>
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

const renderLegendComponent = (records) => {
    return (
        <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20
        }}>
            {records.map(record => (
                <View
                    key={record.id}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    {renderDot(record.color)}
                    <Text style={{ color: 'white' }}>{record.name}</Text>
                </View>
            ))}
        </View>
    );
};

export default CategoriesPieChart