import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function AddRecord({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                backgroundColor:'#202020'
            }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Text style={{color:'white'}}>Add record</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default AddRecord

AddRecord.propTypes = {
    navigation: PropTypes.object
}