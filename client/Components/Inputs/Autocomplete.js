import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { HelperText } from 'react-native-paper';
import UserAvatar from '../../Misc/UserAvatar';

import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

function Autocomplete({ label, onChange, value, dataset, helperText, error, placeholder, itemLabel, disabled, renderItemType, ...props }) {
    const [inputFocus, setInputFocus] = useState(false)

    const getBorderColor = () => {
        if (disabled) return 'rgba(0,0,0,0.5)'
        if (error) return 'red';
        if (inputFocus) return 'tomato';
        return 'grey'
    }

    const getRenderItem = (item) => {
        if(renderItemType === 'withAvatar') {
            return (
                <View style={styles.userAvatarView}>
                    <UserAvatar user={item} style={styles.userAvatar}/>
                    <Text style={{ padding: 15 }}>{item[itemLabel]}</Text>
                </View>
            )
        }
        return (<Text style={{ padding: 15 }}>{item[itemLabel]}</Text>)
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.label}>{label}</Text>
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                onSelectItem={onChange}
                dataSet={dataset}
                showChevron={!disabled}
                onBlur={() => setInputFocus(false)}
                onFocus={() => setInputFocus(true)}
                renderItem={(item) => getRenderItem(item)}
                inputContainerStyle={{
                    backgroundColor: '#202020',
                    borderWidth: 1,
                    borderColor: getBorderColor()
                }}
                containerStyle={styles.container}
                textInputProps={{
                    placeholder: placeholder ?? '',
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: { color: '#fff' },
                    placeholderTextColor: disabled ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)',
                    // value: value ? value[itemLabel] : '',
                    editable: !disabled
                }}
                inputHeight={50}
                {...props}
            />
            {helperText?.length > 0 &&
                <HelperText style={{ color: 'darkgrey' }} type="info" visible={error}>
                    {helperText}
                </HelperText>
            }
        </View>
    )
}

export default Autocomplete

const styles = new StyleSheet.create({
    label: {
        color: 'white',
        marginBottom: 5
    },
    container: {
        flex: 1
    },
    userAvatarView: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    userAvatar: {
        height: '80%',
        width: 40,
        resizeMode: 'cover',
        borderRadius: 5
    }
})