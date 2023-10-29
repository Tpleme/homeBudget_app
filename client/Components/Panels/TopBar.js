import React, { useState } from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBarAvatar from '../../Misc/TopBarAvatar';
import TopBarModal from '../Modals/TopBarModal';
import TextLogo from '../../assets/Logo/logo_text.png'

function TopBar(props) {
    const insets = useSafeAreaInsets();
    const [openUserProfile, setOpenUserProfile] = useState(false)


    return (
        <View style={{
            ...styles.mainContainer,
            paddingTop: insets.top + 10,
        }}>
            <Image alt='text logo' source={TextLogo} style={styles.textLogo}/>
            <Pressable onPress={() => setOpenUserProfile(true)}>
                <TopBarAvatar/>
            </Pressable>
            <TopBarModal open={openUserProfile} close={() => setOpenUserProfile(false)} logOutUser={props.goToLogin} />
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
    },
    textLogo: {
        height: 15,
        width: 150
    }
});