import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { LineChart } from "react-native-gifted-charts";


//a espera de compatibilidade do react-native-gifted-charts com expo https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/359
function HomePageChart() {
    const data1 = [
        {value: 160, date: '1 Apr 2022'},
        {value: 180, date: '2 Apr 2022'},
        {value: 190, date: '3 Apr 2022'},
        {value: 180, date: '4 Apr 2022'},
        {value: 400, date: '5 Apr 2022'},
        {value: 145, date: '6 Apr 2022'},
        {value: 160, date: '7 Apr 2022'},
        {value: 200, date: '8 Apr 2022'},
    ];

    return (
        <View style={styles.homeChartMainView}>
            <LineChart
                areaChart
                curved
                data={data1}
                hideDataPoints
                isAnimated
                height={250}
                color1="tomato"
                startFillColor1="tomato"
                endFillColor1="transparent"
                startOpacity={0.9}
                endOpacity={0.2}
                initialSpacing={0}
                noOfSections={4}
                yAxisThickness={0}
                xAxisColor='transparent'
                rulesType="solid"
                rulesColor="gray"
                yAxisTextStyle={{ color: 'gray' }}
                yAxisLabelSuffix="€"
                adjustToWidth={true}
                endSpacing={0}
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
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
                                        {'$' + items[0].value + '.0'}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </View>
    )
}

export default HomePageChart

const styles = StyleSheet.create({
    homeChartMainView: {
        flex: 1,
        height: '100%',
        width: '100%',
    }
})