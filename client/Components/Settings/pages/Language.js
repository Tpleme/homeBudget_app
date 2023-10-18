import { View, Text, StatusBar, FlatList, StyleSheet, Pressable } from 'react-native';
import React from 'react'
import NavigateBack from '../../../Misc/NavigateBack';
import { useTranslation } from 'react-i18next';

function Language({ navigation }) {
    const { t, i18n } = useTranslation();

    const languagesArray = [
        { label: 'Português', code: 'pt' },
        { label: 'English', code: 'en' },
    ]

    const changeLanguage = lang => {
        i18n.changeLanguage(lang.code)
    }


    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
            }}>
            <NavigateBack navigation={navigation} />
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <FlatList
                style={styles.list}
                contentContainerStyle={{ rowGap: 5, paddingBottom: 20 }}
                renderItem={({ item }) => <ListItem language={item} onPress={() => changeLanguage(item)} i18n={i18n} />}
                keyExtractor={(item) => item.code}
                ItemSeparatorComponent={<View style={{ width: '90%', height: 1, backgroundColor: 'white', alignSelf: 'center' }} />}
                data={languagesArray}
            />
        </View>
    )
}

const ListItem = ({ language, onPress, i18n }) => {

    const adicionalStyle = i18n.language === language.code ? { color: 'tomato' } : { color: 'white'}

    return (
        <Pressable style={styles.listItem} onPress={onPress}>
            <Text style={{...adicionalStyle, ...styles.listItemText }}>{language.label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    list: {
        marginTop: 70,
        flex: 1,
        width: '100%'
    },
    listItem: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: 20,
    }
})

export default Language