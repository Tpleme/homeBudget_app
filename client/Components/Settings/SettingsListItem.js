import React from 'react';
import { TouchableOpacity, View, Linking, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SettingsListItem = (props) => {

    const getSecondaryStyle = () => {
        if (props.isFirstElement) {
            return styles.isFirstElement
        }
        if (props.isLastElement) {
            return styles.isLastElement
        }
    }

    return (
        <TouchableOpacity
            {...props}
            activeOpacity={1}
            onPress={() => actionForMenuItem(props.item)}
            style={{ ...styles.mainContainer, ...getSecondaryStyle() }}
        >
            <Text numberOfLines={1} style={{color: 'white'}}>
                {props.item}
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

const actionForMenuItem = (item) => {
    switch (item) {
        case 'aboutMe': {
            Linking.openURL('https://google.com');
            break;
        }
        case 'help': {
            Linking.openURL('https://google.com');
            break;
        }
        case 'spaceAPI': {
            Linking.openURL('https://google.com');
        }
    }
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