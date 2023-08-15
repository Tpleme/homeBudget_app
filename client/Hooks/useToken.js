import { useState } from 'react'
import * as SecureStore from 'expo-secure-store'

export default function useToken() {
    const getToken = async () => {
        const tokenString = await SecureStore.getItemAsync('token')
        console.log(tokenString)
        if (isJsonParsable(tokenString)) {
            const userToken = JSON.parse(tokenString)
            return userToken?.token
        }
        return null
    }

    const [token, setToken] = useState(getToken())

    const saveToken = async userToken => {
        if (userToken === null) {
            await SecureStore.deleteItemAsync('token')
            setToken(null)
        } else {
            await SecureStore.setItemAsync('token', JSON.stringify(userToken))
            setToken(userToken.token)
        }
    }

    return {
        setToken: saveToken,
        token,
    }
}

const isJsonParsable = string => {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}