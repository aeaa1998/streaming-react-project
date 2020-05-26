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
import * as actions from '../actions/favorites';
import * as types from '../types/favorites';
import { create, list, handleResponse, retrieve, deleteAction } from '../components/utils/Api'
import { normalize } from 'normalizr'
import { favorites as favoritesSchema, favorite as favoriteSchema } from '../schemas/favorites'
import { ToastAndroid, Toast, Platform } from 'react-native'




function* fetchFavorites(action) {
    const errorMsg = 'Error al cargar la lista de favoritos'
    try {
        const onSuccess = function* (data, code) {
            const { entities: favorites, result: order } = normalize(data, favoritesSchema)
            yield put(actions.completeFetchFavorites({ entities: favorites, result: order }));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchFavorites());
        }
        yield handleResponse(list, 'favorites/', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchFavorites());
    }
}
function* addFavorite(action) {
    const errorMsg = 'Error al agregar a favoritos'
    try {
        const onSuccess = function* (favorite, code) {
            yield put(actions.completedAddFavorites(favorite));
        }
        const onError = function* (response) {
            const json = yield response.json()
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedAddFavorites());
        }
        yield handleResponse(create, { url: 'favorites/', data: action.payload.favorite }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedAddFavorites());
    }
}

function* deleteFavorite(action) {
    const errorMsg = 'Error al eliminar de favoritos'
    try {
        const onSuccess = function* (favorite, code) {
            yield put(actions.completedDeleteFavorites(action.payload.favorite));
        }
        const onError = function* (response) {
            const json = yield response.json()
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedDeleteFavorites());
        }
        yield handleResponse(deleteAction, { url: 'favorites', id: action.payload.favorite.id }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedDeleteFavorites());
    }
}



const watchFetchFavorites = function* () {
    yield takeEvery(
        types.FETCH_FAVORITES_STARTED,
        fetchFavorites,
    );
}

const watchAddFavorite = function* () {
    yield takeEvery(
        types.ADD_FAVORITES_STARTED,
        addFavorite,
    );
}

const watchDeleteFavorite = function* () {
    yield takeEvery(
        types.DELETE_FAVORITES_STARTED,
        deleteFavorite,
    );
}

export const watchers = [
    watchFetchFavorites,
    watchAddFavorite,
    watchDeleteFavorite,
]



