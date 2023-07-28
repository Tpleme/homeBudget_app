import axios from 'axios'
import { SERVER_URL } from '@env'


const getHeaders = async () => {
    return {
        "Authorization": JSON.parse(sessionStorage.getItem('token'))?.token,
        "requesting-user": `fo_${sessionStorage.getItem('id')}`,
    }
}

export const loginUser = async (email, password) => {
    return await axios.post(`${SERVER_URL}/api/app_users/auth`, { email, password })
}

export const getEntity = async (entity, id) => {
    return await axios.get(`${SERVER_URL}/api/${entity}${id ? `/${id}` : ''}`, { headers: await getHeaders() })
}

export const editEntity = async (entity, id, data) => {
    return await axios.put(`${SERVER_URL}/api/${entity}${id ? `/${id}` : ''}`, data, { headers: await getHeaders() })
}