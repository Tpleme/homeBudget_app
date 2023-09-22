import React from 'react';
import { DatePickerModal } from 'react-native-paper-dates';

const DateRangePicker = (props) => {
    return (
        <DatePickerModal
            locale="pt"
            mode="range"
            allowEditing={false}
            {...props}
        />
    );
}

export default DateRangePicker;

