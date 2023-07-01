import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export const SettingsListSectionHeader = (props) => {
    const { icon, title } = props;

    return (
        <View style={styles.mainContainer}>
            {icon}
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 24,
        marginBottom: 24,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginLeft: 16,
        color: 'white',
        fontSize: 22
    }
});