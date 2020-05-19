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
import * as actions from '../actions/genres';
import * as types from '../types/genres';
import { create, list, handleResponse, retrieve } from '../components/utils/Api'
import { normalize } from 'normalizr'
import { genres as genresSchema } from '../schemas/genres'
import { ToastAndroid, Toast, Platform } from 'react-native'




function* fetchGenres() {
    try {
        const onSuccess = function* (data, code) {
            const { entities: genres, result: order } = normalize(data, genresSchema)
            yield put(actions.completeFetchGenres({ entities: genres, result: order }));
        }
        const onError = function* (response) {
            ToastAndroid.show('Error al actualizar la lista de géneros', ToastAndroid.LONG)
            yield put(actions.failedFetchGenres());
        }
        yield handleResponse(list, 'genres/', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show('Error al actualizar la lista de canciones', ToastAndroid.LONG)
        yield put(actions.failedFetchGenres());
    }
}



const watchFetchGenres = function* () {
    yield takeEvery(
        types.FETCH_GENRES_STARTED,
        fetchGenres,
    );
}

export const watchers = [
    watchFetchGenres,
]



