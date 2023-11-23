import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { LineChart } from "react-native-gifted-charts";
import moment from 'moment';

function HomePageChart(props) {

    const [chartData, setChartData] = useState([])

    const customDataPoint = () => {
        return (
            <View
                style={{
                    width: 17,
                    height: 17,
                    backgroundColor: '#202020',
                    borderWidth: 3,
                    borderRadius: 10,
                    borderColor: 'tomato',
                }}
            />
        );
    };

    const customLabel = val => {
        return (
            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{val}</Text>
            </View>
        );
    };

    useEffect(() => {
        if (props.data.length > 0) {
            let data = props.data.map(el => (
                {
                    value: parseFloat(el.total),
                    date: `${moment(el.start_date).format('DD MMM')} - ${moment(el.end_date).format('DD MMM')}`,
                    labelComponent: () => customLabel(`${moment(el.start_date).format('DD MMM')} - ${moment(el.end_date).format('DD MMM')}`)
                }
            ))

            //if the data is only one value, we need to create an empty value to show the chart
            //otherwise it gives bunch of errors
            if (data.length === 1) {
                data = [{ value: 0 }, data[0]]
            }

            setChartData(data)
        }
    }, [props.data])



    return (
        <View style={styles.homeChartMainView}>
            {chartData.length > 0 ?
                <LineChart
                    thickness1={3}
                    areaChart
                    curved
                    data={chartData}
                    isAnimated
                    height={220}
                    color1="tomato"
                    startFillColor1="tomato"
                    endFillColor1="transparent"
                    startOpacity={0.9}
                    endOpacity={0}
                    noOfSections={4}
                    hideRules
                    yAxisThickness={0}
                    customDataPoint={customDataPoint}
                    hideYAxisText
                    xAxisColor='transparent'
                    adjustToWidth={true}
                    pointerConfig={{
                        pointerStripHeight: 160,
                        pointerStripColor: 'lightgray',
                        pointerStripWidth: 2,
                        radius: 6,
                        pointerLabelWidth: 100,
                        pointerLabelHeight: 90,
                        activatePointersOnLongPress: true,
                        autoAdjustPointerLabelPosition: false,
                        pointerComponent: () => <View style={{
                            width: 17,
                            height: 17,
                            backgroundColor: 'tomato',
                            borderRadius: 20,
                            marginLeft: -5
                        }} />,
                        pointerLabelComponent: items => {
                            return (
                                <View
                                    style={{
                                        height: 90,
                                        width: 100,
                                        justifyContent: 'center',
                                        marginTop: -30,
                                        marginLeft: -40,
                                    }}>
                                    <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
                                        {items[0].date}
                                    </Text>

                                    <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                            {'€' + items[0].value}
                                        </Text>
                                    </View>
                                </View>
                            );
                        },
                    }}
                />
                :
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText}>
                        {`Sem dados de despesas para mostrar.\n\nAdicione despesas para poder ver um gráfico.`}
                    </Text>
                </View>
            }
        </View>
    )
}

export default HomePageChart

const styles = StyleSheet.create({
    homeChartMainView: {
        flex: 1,
        height: '100%',
        width: '100%',
        padding: 10
    },
    noDataView: {
        height: '100%',
        width: '100%',
        borderColor: 'tomato',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        color: 'grey',
        textAlign: 'center',
    }
})