import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
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
            onPress={() => actionForMenuItem(props.item, props.navigation)}
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

const actionForMenuItem = (item, navigation) => {
    switch (item) {
        case 'aboutMe': {
            navigation.navigate('About')
            break;
        }
        case 'help': {
            navigation.navigate('Theme')
            break;
        }
        case 'spaceAPI': {
            navigation.navigate('Help')
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