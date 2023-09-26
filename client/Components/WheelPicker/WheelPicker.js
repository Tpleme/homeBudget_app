import React, { useRef } from 'react'
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';


//onMomentumScrollBegin e canMomentum são workarround para um problema do onMomentumScrollEnd ser invokado varias vezes

function WheelPicker({ items, onChange, itemHeight, ...props }) {

    const scrollY = useRef(new Animated.Value(0)).current;
    const canMomentum = useRef(false);

    const onMomentumScrollBegin = () => {
        canMomentum.current = true;
    };

    const renderItem = ({ item, index }) => {

        const inputRange = [
            (index - 2) * itemHeight,
            (index - 1) * itemHeight,
            index * itemHeight,
        ];

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
        });

        return (
            <Animated.View
                style={[
                    { height: itemHeight, lineHeight: itemHeight, transform: [{ scale }] },
                    styles.animatedContainer,
                ]}>
                <Text style={styles.pickerItem}>{item}</Text>
            </Animated.View>
        );
    };

    const momentumScrollEnd = (event) => {
        if (canMomentum.current) { //workaround por causa de esta função ser invokada multiplas vezes  
            const y = event.nativeEvent.contentOffset.y;
            const index = Math.round(y / itemHeight);
            onChange(items[index]);
        }
        canMomentum.current = false;
    };

    return (
        <View style={{ ...styles.flatListWrapper, height: itemHeight * 3, width: props.width }}>
            <Animated.FlatList
                data={['', ...items, '']}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                snapToInterval={itemHeight}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={momentumScrollEnd}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true },
                )}
                getItemLayout={(_, index) => ({
                    length: itemHeight,
                    offset: itemHeight * index,
                    index,
                })}
            />
            <View style={[styles.indicatorHolder, { top: itemHeight }]}>
                <View style={[styles.indicator]} />
                <View style={[styles.indicator, { marginTop: itemHeight }]} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    flatListWrapper: {
        top: 10,
        // borderWidth: 1,
        // borderColor: 'red'
    },
    pickerItem: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    indicatorHolder: {
        position: 'absolute',
        width: '100%'
    },
    indicator: {
        width: '100%',
        height: 2,
        backgroundColor: '#ccc',
    },
})

export default WheelPicker