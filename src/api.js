import axios from 'axios';

const API_URL = 'https://mcdonalds.trio.dev'

export const getMenu = async () => {
    try {
        resp = await axios.get(API_URL + '/menu')
        return { success: true, data: resp.data.menus }
    } catch (error) {
        return { success: false, error: { msg: error.message } }
    }
}