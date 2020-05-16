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
const API_BASE_URL = 'https://e17357b3.ngrok.io/api';

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


export const update = ({ url, data }, withAuth = true) =>
    fetch(`${API_BASE_URL}/${url}`, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: resolveHeaders(withAuth),
    });

export const handleResponse = function* (method, parameters, onSuccess = function* (data, code) { }, onError = function* (response) { }) {
    // const response = yield call(fetch, 'url', {})
    // get de un user
    const response = yield call(method, parameters);

    if (response.status >= 200 && response.status <= 299) {
        const code = response.status
        const data = yield response.json();
        yield onSuccess(data, code);
        // token 1 dia
        // 7 dias

    } else {
        if (response.status == 401) {
            let token = selectToken(store.getState());
            const tokenResponse = yield call(create, { url: 'token-refresh/', data: { token: token } }, false);
            if (tokenResponse.status >= 200 && tokenResponse.status <= 299) {
                const { newToken } = yield tokenResponse.json();
                yield put(actions.completeLogin(newToken));
                yield handleResponse(method, parameters, onSuccess, onError);
            } else {
                yield put(actions.logout());
                const navigator = yield select(selectors.getRootNavigator);
                navigator.navigate('Auth');
            }
        } else {
            yield onError(response);
        }
    }
};