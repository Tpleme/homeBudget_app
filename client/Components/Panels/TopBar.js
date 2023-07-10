import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBarAvatar from '../../Misc/TopBarAvatar';
import TopBarModal from '../Modals/TopBarModal';

function TopBar() {
    const insets = useSafeAreaInsets();
    const [openUserProfile, setOpenUserProfile] = useState(false)

    return (
        <View style={{
            ...styles.mainContainer,
            paddingTop: insets.top + 10,
        }}>
            <Text style={{ color: 'white' }}>Home Budget</Text>
            <Pressable onPress={() => setOpenUserProfile(true)}>
                <TopBarAvatar />
            </Pressable>
            <TopBarModal open={openUserProfile} close={() => setOpenUserProfile(false)} />
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        height:45
    },
});