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
import * as actions from '../actions/artists';
import * as types from '../types/artists';
import { create, list, handleResponse, retrieve, deleteAction } from '../components/utils/Api'
import { normalize } from 'normalizr'
import { artists as artistsSchema, artist as artistSchema, genresWithArtists } from '../schemas/artists'
import { ToastAndroid, Toast, Platform } from 'react-native'


function* fetchArtists(action) {
    const errorMsg = 'Error al cargar los artistas'
    try {
        const onSuccess = function* (data, code) {
            const { entities: artists, result: order } = normalize(data, artistsSchema)
            yield put(actions.completeFetchArtists({ entities: artists, result: order }));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchArtists());
        }
        yield handleResponse(list, 'artists/', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchArtists());
    }
}

function* fetchSelectedArtist(action) {
    const errorMsg = 'Error al cargar el artista '
    try {
        const onSuccess = function* (artist, code) {
            yield put(actions.completeFetchSelectedArtists(artist));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchSelectedArtists());
        }
        yield handleResponse(retrieve, { url: 'artists', id: action.payload.artistId }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchSelectedArtists());
    }
}

function* fetchArtistsByGenre(action) {
    const errorMsg = 'Error al cargar los artistas'
    try {
        const onSuccess = function* (data, code) {
            yield put(actions.completeFetchArtistsByGenre(normalize(data, genresWithArtists)));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchArtistsByGenre());
        }
        yield handleResponse(list, 'artists/by/genres', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchArtistsByGenre());
    }
}


const watchFetchArtists = function* () {
    yield takeEvery(
        types.FETCH_ARTISTS_STARTED,
        fetchArtists,
    );
};

const watchFetchArtistsByGenre = function* () {
    yield takeEvery(
        types.FETCH_ARTISTS_BY_GENRE_STARTED,
        fetchArtistsByGenre,
    );
};

// const watchFetchSelectedArtistsByGenre = function* () {
const watchFetchSelectedArtist = function* () {
    yield takeEvery(
        types.FETCH_SELECTED_ARTIST_STARTED,
        fetchSelectedArtist,
    );
};



export const watchers = [
    watchFetchArtists,
    watchFetchArtistsByGenre,
    // watchFetchSelectedArtistsByGenre,
    watchFetchSelectedArtist,
];

