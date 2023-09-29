import axios from 'axios'
// import { SERVER_URL } from '@env'
import { getItemAsync } from 'expo-secure-store'

//TODO: env vars acting funny, had to place url right here 
const SERVER_URL = 'http://192.168.1.100:3000'

const getHeaders = async () => {
    const key = await getItemAsync('token');
    const id = await getItemAsync('id')

    return {
        "Authorization": key,
        "requesting-user": `fo_${id}`,
        "lang": 'en'
    }
}

const getFileHeaders = async () => {
    const key = await getItemAsync('token');
    const id = await getItemAsync('id')

    return {
        "Authorization": key,
        "requesting-user": `fo_${id}`,
        "lang": 'en',
        'accept': 'application/json',
        'Content-Type': `multipart/form-data`,
        // 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    }
}

export const loginUser = async (email, password) => {
    return await axios.post(`${SERVER_URL}/api/app_users/auth`, { email, password })
}

export const getEntity = async ({ entity, id, query }) => {
    const queryString = '?' + new URLSearchParams(query).toString();
    const url = query ? id ? `/${id}${queryString}` : queryString : id ? `/${id}` : ''

    return await axios.get(`${SERVER_URL}/api/${entity}${url}`, { headers: await getHeaders() })
}

export const createEntity = async ({ entity, data }) => {
    return await axios.post(`${SERVER_URL}/api/${entity}`, data, { headers: await getHeaders() })
}

export const editEntity = async ({ entity, id, data }) => {
    return await axios.put(`${SERVER_URL}/api/${entity}${id ? `/${id}` : ''}`, data, { headers: await getHeaders() })
}

export const deleteEntity = async ({ entity, id }) => {
    return await axios.delete(`${SERVER_URL}/api/${entity}/${id}`, { headers: await getHeaders() })
}

export const changePassword = async (data, id) => {
    return await axios.post(`${SERVER_URL}/api/app_users/change-pass/${id}`, data, { headers: await getHeaders() })
}

export const changePortrait = async (id, data) => {
    return await axios.post(`${SERVER_URL}/api/app_users/add-picture/${id}`, data, { headers: await getFileHeaders(data) })
}

export const removePortrait = async (id) => {
    return await axios.post(`${SERVER_URL}/api/app_users/remove-picture/${id}`, {}, { headers: await getHeaders() })
}

export const getOpenBalance = async ({ data }) => {
    return await axios.post(`${SERVER_URL}/api/balance/get-open-balance/`, data, { headers: await getHeaders() })
}