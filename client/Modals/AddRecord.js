import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native';

function AddRecord({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    );
}

export default AddRecord

AddRecord.propTypes = {
    navigation: PropTypes.object
}