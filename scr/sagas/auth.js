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
import * as profileActions from '../actions/profile'
import * as types from '../types/auth';
import { create, handleResponse } from '../components/utils/Api'




function* login(action) {
    try {
        const response = yield call(create, { url: 'login/', data: action.payload }, false)
        if (response.status >= 200 && response.status <= 299) {
            //http response = response
            //data = .json()
            const { token, payload } = yield response.json();
            yield put(actions.completeLogin(token));
            yield put(profileActions.completeFetchUserProfile(payload.profile));
            const navigator = yield select(selectors.getRootNavigator)
            navigator.navigate('App');
        } else {
            acceptDialog("Error", "Credenciales invalidas")
            yield put(actions.failLogin());
        }
    } catch (error) {
        acceptDialog("Error", "No se ha podido ingresar sesión")
        yield put(actions.failLogin());
    }
}

function* register(action) {
    try {
        const navigator = yield select(selectors.getRootNavigator)
        const response = yield call(create, { url: 'register/', data: action.payload }, false)

        if (response.status >= 200 && response.status <= 299) {
            const { data } = yield response.json();
            navigator.navigate('Login');
            yield put(actions.registerSucceded());
        } else {
            acceptDialog("Error", `El usuario ${action.payload.username} ya ha sido tomado`)
            yield put(actions.registerFailed());
        }
    } catch (error) {
        acceptDialog("Error", "No se ha podido registrar el usuario")
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
