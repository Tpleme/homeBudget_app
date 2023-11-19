import React from 'react'
import { Image } from 'react-native'
import WomanPortrait from '../assets/placeholders/woman_portrait.jpeg'
import ManPortrait from '../assets/placeholders/man_portrait.png'

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL

function UserAvatar({ user, style, alt }) {
    return (
        <Image
            alt={alt ?? 'portrait'}
            style={style}
            source={
                user.picture ?
                    { uri: `${SERVER_URL}/resources/images/app_users/${user.picture}` }
                    :
                    user.gender === 'F' ? WomanPortrait : ManPortrait
            }
        />
    )
}

export default UserAvatar