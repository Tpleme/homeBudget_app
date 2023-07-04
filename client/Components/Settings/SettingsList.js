import React from 'react'
import { SectionList, View } from 'react-native';
import { SettingsListItem } from './SettingsListItem';
import { SettingsListSectionHeader } from './SettingsListSectionHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const settingsData = [
    {
        title: 'General',
        icon: (
            <View style={{ padding: 10, borderRadius: 8, backgroundColor: 'tomato' }}>
                <Ionicons name='home' size={25} color='white' />
            </View>
        ),
        data: [
            { route: 'theme', title: 'Theme' },
        ],
    },
    {
        title: 'Feedback and Help',
        icon: (
            <View style={{ padding: 10, borderRadius: 8, backgroundColor: 'tomato' }}>
                <Ionicons name='home' size={25} color='white' />
            </View>
        ),
        data: [
            { route: 'about', title: 'About' },
            { route: 'help', title: 'Help' },
            { route: 'review', title: 'Review' },
            { route: 'feedback', title: 'Feedback' },
            { route: 'contacts', title: 'Contacts' },
        ],
    },
];

function SettingsList({ navigation }) {
    return (
        <SectionList
            sections={settingsData}
            style={{ flex: 1, width: '100%' }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={ListSeparator}
            keyExtractor={(it) => it}
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