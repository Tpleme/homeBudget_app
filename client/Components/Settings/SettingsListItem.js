import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SettingsListItem = (props) => {

    const getSecondaryStyle = () => {
        let itemStyle = {}

        if (props.isFirstElement) {
            itemStyle = { ...itemStyle, ...styles.isFirstElement }
        }
        if (props.isLastElement) {
            itemStyle = { ...itemStyle, ...styles.isLastElement }
        }

        return itemStyle
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => props.navigation.navigate(props.item.route)}
            style={{ ...styles.mainContainer, ...getSecondaryStyle() }}
            {...props}
        >
            <Text numberOfLines={1} style={{ color: 'white' }}>
                {props.item.title}
            </Text>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}>
                <View>
                    <Ionicons name='chevron-forward-outline' size={20} color='white' />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#3e3e3e',
    },
    isFirstElement: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    isLastElement: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    }
});