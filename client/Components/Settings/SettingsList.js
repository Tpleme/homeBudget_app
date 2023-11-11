import React from 'react'
import { SectionList, View } from 'react-native';
import { SettingsListItem } from './SettingsListItem';
import { SettingsListSectionHeader } from './SettingsListSectionHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next'


function SettingsList({ navigation }) {
    const { t } = useTranslation()

    const settingsData = [
        {
            title: t('settings.general.title'),
            icon: (
                <View style={{ padding: 10, borderRadius: 8, backgroundColor: 'tomato' }}>
                    <Ionicons name='settings-outline' size={25} color='white' />
                </View>
            ),
            data: [
                // { route: 'theme', title: t('settings.general.items.theme') },
                { route: 'language', title: t('settings.general.items.language') },
            ],
        },
        {
            title: t('settings.about.title'),
            icon: (
                <View style={{ padding: 10, borderRadius: 8, backgroundColor: 'tomato' }}>
                    <Ionicons name='information-outline' size={25} color='white' />
                </View>
            ),
            data: [
                { route: 'about', title: t('settings.about.items.about') },
            ],
        },
    ];


    return (
        <SectionList
            sections={settingsData}
            style={{ flex: 1, width: '100%' }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={ListSeparator}
            keyExtractor={(it) => it.route}
            renderItem={(props) => {
                const isFirstElement = props.index === 0;
                const isLastElement = props.index === props.section.data.length - 1;
                
                return (
                    <SettingsListItem
                        item={props.item}
                        isFirstElement={isFirstElement}
                        isLastElement={isLastElement}
                        navigation={navigation}
                    />
                );
            }}
            renderSectionHeader={({ section: { title, icon } }) => (
                <SettingsListSectionHeader icon={icon} title={title} />
            )}
        />
    )
}

export default SettingsList

const ListSeparator = () => {
    return (
        <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }} />
    )
}