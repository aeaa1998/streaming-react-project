
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { store } from '../../../../App'

const API_BASE_URL = 'https://a81cec46.ngrok.io/api';


function selectToken(state) {
    return state.auth.token
}

const resolveHeaders = (withAuth) => {
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    if (withAuth) {
        let token = selectToken(store.getState())
        headers['AUTHORIZATION'] = `JWT ${token}`
    }
    return headers
}

export const retrieve = (url, id, withAuth = true) => fetch(`${API_BASE_URL}/${url}/${id}`, { headers: resolveHeaders(withAuth) })
export const list = (url, withAuth = true) => fetch(`${API_BASE_URL}/${url}`, { headers: resolveHeaders(withAuth) })

export const create = ({ url, data }, withAuth = true) =>
    fetch(`${API_BASE_URL}/${url}`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: resolveHeaders(withAuth),
    })

