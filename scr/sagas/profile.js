/* eslint-disable prettier/prettier */
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
import * as actions from '../actions/profile';
import * as types from '../types/profile';
import { create, list, handleResponse, update } from '../components/utils/Api'

import { ToastAndroid, Platform } from 'react-native'




function* fetchUserProfile() {
    const navigator = yield select(selectors.getRootNavigator)
    try {
        const onSuccessFetchUserProfile = function* (profile, code) {
            navigator.navigate('App')
            yield put(actions.completeFetchUserProfile(profile));
        }
        const onErrorFetchUserProfile = function* (response) {
            navigator.navigate('App')
            ToastAndroid.show('Hubo un error al cargar el usuario', ToastAndroid.LONG)
            yield put(actions.failedFetchUserProfile());
        }
        // Esta funcion parametro (funcion, parametros, callback en caso sea exitoso, un callback en caso que sea 400)
        yield handleResponse(list, 'profiles/user/', onSuccessFetchUserProfile, onErrorFetchUserProfile)
    } catch (error) {

        navigator.navigate('App')
        ToastAndroid.show('Hubo un error en la conexión a internet', ToastAndroid.LONG)
        yield put(actions.failedFetchUserProfile());
    }
}

function* updateProfile(action) {
    const errorMsg = 'Hubo un error al actualizar el usuario';
    try {
        const currentProfile = yield select(selectors.getUserProfile)
        const onSuccess = function* (profile, code) {
            yield put(actions.completeUpdateProfile(profile));
            ToastAndroid.show('Se cambio con exito el número de telefono', ToastAndroid.LONG)
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedUpdateProfile());
        }
        yield handleResponse(update, { url: "profiles", id: currentProfile.id, data: action.payload }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedUpdateProfile());
    }
}



function* watchProfileFetchStarted() {
    yield takeEvery(
        types.FETCH_PROFILE_STARTED,
        fetchUserProfile,
    );
}
function* watchUpdateProfile() {
    yield takeEvery(
        types.UPDATE_PROFILE_STARTED,
        updateProfile,
    );
}

export const watchers = [
    watchProfileFetchStarted,
    watchUpdateProfile,
]

