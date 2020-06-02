/* eslint-disable no-shadow */

/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { store } from '../../../../App';
import * as actions from '../../../actions/auth';
import * as selectors from '../../../reducers';
import {
    call,
    put,
    select,
} from 'redux-saga/effects';
const prefix = 'https://ea80efe4.ngrok.io';
const API_BASE_URL = `${prefix}/api`;

function selectToken(state) {
    return state.auth.token;
}

const resolveHeaders = (withAuth) => {
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    if (withAuth) {
        let token = selectToken(store.getState());
        headers['AUTHORIZATION'] = `JWT ${token}`;
    }
    return headers;
};


export const retrieve = ({ url, id }, withAuth = true) => fetch(`${API_BASE_URL}/${url}/${id}`, { headers: resolveHeaders(withAuth) });
export const list = (url, withAuth = true) => fetch(`${API_BASE_URL}/${url}`, { headers: resolveHeaders(withAuth) });

export const create = ({ url, data }, withAuth = true) =>
    fetch(`${API_BASE_URL}/${url}`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: resolveHeaders(withAuth),
    });

export const deleteAction = ({ url, id, data = undefined }, withAuth = true) => {
    let config = {
        method: 'DELETE', // or 'PUT'
        headers: resolveHeaders(withAuth),
    }
    if (data != undefined) {
        config['body'] = JSON.stringify(data)
    }
    return fetch(`${API_BASE_URL}/${url}/${id}/`, config)
};


export const update = ({ url, id = undefined, data }, withAuth = true) => {
    const urlString = id ? `${API_BASE_URL}/${url}/${id}/` : `${API_BASE_URL}/${url}/`
    return fetch(urlString, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: resolveHeaders(withAuth),
    })
};

export const handleResponse = function* (method, parameters, onSuccess = function* (data, code) { }, onError = function* (response) { }) {
    const response = yield call(method, parameters);

    if (response.status >= 200 && response.status <= 299) {
        const code = response.status
        if (response.status == 204) {
            yield onSuccess(response, code);
        } else {
            const data = yield response.json();
            yield onSuccess(data, code);
        }
    } else {
        if (response.status == 401) {
            let token = selectToken(store.getState());
            const tokenResponse = yield call(create, { url: 'token-refresh/', data: { token: token } }, false);
            if (tokenResponse.status >= 200 && tokenResponse.status <= 299) {
                const { token } = yield tokenResponse.json();
                console.log(token)
                yield put(actions.completeLogin(token));
                yield handleResponse(method, parameters, onSuccess, onError);
            } else {
                try {
                    const { errors } = yield tokenResponse.json();
                    yield put(actions.logout());
                } catch (e) {

                }
            }
        } else {
            yield onError(response);
        }
    }
};