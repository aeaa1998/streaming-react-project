/* eslint-disable prettier/prettier */
import { acceptDialog } from '../components/utils/Alerts'
import { ToastAndroid, Toast } from 'react-native'
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
import { create, handleResponse, update } from '../components/utils/Api'




function* login(action) {
    try {
        const response = yield call(create, { url: 'login/', data: action.payload }, false)
        if (response.status >= 200 && response.status <= 299) {
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

function* changePassword(action) {
    try {
        const onSuccess = function* (response, code) {
            yield put(actions.changePasswordSucceded());
            ToastAndroid.show('Se cambio la contraseña con exito', ToastAndroid.LONG)
            action.callback()
        }

        const onError = function* (response) {
            yield put(actions.changePasswordFailed());
            acceptDialog("Credenciales invalidas", "La contraseña es inválida")
        }
        yield handleResponse(update, { url: 'profiles/change/password/', data: action.payload }, onSuccess, onError)
    } catch (e) {
        acceptDialog("Error", "No se pudo cambiar la contraseña")
    }
}

function* logout() {
    try {
        const navigator = yield select(selectors.getRootNavigator);
        navigator.navigate('Auth')
    } catch (e) {
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

export function* watchChangePassword() {
    yield takeEvery(
        types.CHANGE_PASSWORD_STARTED,
        changePassword,
    );
}
export function* watchLogout() {
    yield takeEvery(
        types.AUTHENTICATION_IDENTITY_CLEARED,
        logout,
    );
}

export const watchers = [
    watchLoginStarted,
    watchRegisterStarted,
    watchChangePassword,
    watchLogout,
]
