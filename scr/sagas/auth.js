/* eslint-disable prettier/prettier */
import { acceptDialog } from '../components/utils/Alerts'
import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';

import * as selectors from '../reducers';
import * as actions from '../actions/auth';
import * as types from '../types/auth';


const API_BASE_URL = 'http://localhost:8000/api';


function* login(action) {
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/token-auth/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        // if (response.status >= 200 && response.status <= 299) {
        //     const { token } = yield response.json();
        //     yield put(actions.failLogin('Falló horrible la conexión mano'));
        //     // yield put(actions.completeLogin(token));
        // } else {
        //     const { non_field_errors } = yield response.json();
        //     yield put(actions.failLogin(non_field_errors[0]));
        // }
    } catch (error) {
        console.log(error)
        acceptDialog()
        yield put(actions.failLogin());
    }
}

function* register(action) {
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/register/`,
            {
                method: 'POST',
                body: JSON.stringify({ email: action.payload.username, password: action.payload.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status >= 200 && response.status <= 299) {
            const { data } = yield response.json();
            yield put(actions.registerSucceded());
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.registerFailed());
        }
    } catch (error) {
        yield put(actions.registerFailed());
    }
}

export function* watchLoginStarted() {
    yield takeEvery(
        types.AUTHENTICATION_STARTED,
        login,
    );
}

export function* watchRegisterStarted() {
    yield takeEvery(
        types.REGISTRATION_STARTED,
        register,
    );
}
