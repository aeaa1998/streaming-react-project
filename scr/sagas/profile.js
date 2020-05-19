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
import { create, list, handleResponse } from '../components/utils/Api'

import { ToastAndroid, Toast, Platform } from 'react-native'




function* fetchUserProfile() {
    const navigator = yield select(selectors.getRootNavigator)
    try {
        const onSuccessFetchUserProfile = function* (profile, code) {
            navigator.navigate('App')
            yield put(actions.completeFetchUserProfile(profile));
        }
        const onErrorFetchUserProfile = function* (response) {
            navigator.navigate('App')
            ToastAndroid.show('Hubo un error al cargar el usuario', Toast.LONG)
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



export function* watchProfileFetchStarted() {
    yield takeEvery(
        types.FETCH_PROFILE_STARTED,
        fetchUserProfile,
    );
}


