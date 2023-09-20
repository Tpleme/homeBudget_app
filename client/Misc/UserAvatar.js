import React from 'react'
import { Image } from 'react-native'
// import { SERVER_URL } from '@env'
import WomanPortrait from '../assets/placeholders/woman_portrait.jpeg'
import ManPortrait from '../assets/placeholders/man_portrait.png'

//TODO: env vars acting funny, had to place url right here 
const SERVER_URL = 'http://192.168.1.100:3000'

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