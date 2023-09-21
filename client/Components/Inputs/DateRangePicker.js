import React from 'react';
import { DatePickerModal } from 'react-native-paper-dates';
import { Provider, DefaultTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native';

const theme = {
    ...DefaultTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
    },
};

const DateRangePicker = (props) => {
    return (
        <Provider theme={theme}>
            <DatePickerModal
                locale="en-GB"
                mode="range"
                style={styles.datePicker}
                allowEditing={false}
                {...props}
            />
        </Provider>
    );
}

const styles = StyleSheet.create({

});

export default DateRangePicker;

