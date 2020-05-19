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
import * as actions from '../actions/tracks';
import { normalize } from 'normalizr'
import { tracks as tracksSchema } from '../schemas/tracks'
import * as types from '../types/tracks';
import { create, list, handleResponse, retrieve } from '../components/utils/Api'

import { ToastAndroid, Toast, Platform } from 'react-native'


function* fetchSelectedTrack(action) {
    try {
        const onSuccess = function* (track, code) {
            yield put(actions.completeFetchSelectedTrack(track));
        }
        const onError = function* (response) {
            ToastAndroid.show('Error al jalar la información de la canción', ToastAndroid.LONG)
            yield put(actions.failedFetchSelectedTrack());
        }
        yield handleResponse(retrieve, { url: 'tracks', id: action.payload.id }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show('Error al jalar la información de la canción', ToastAndroid.LONG)
        yield put(actions.failedFetchSelectedTrack());
    }
}

function* fetchTracks(action) {
    try {
        const onSuccess = function* (data, code) {
            const { entities: tracks, result: order } = normalize(data, tracksSchema)
            yield put(actions.completeFetchTracks({ entities: tracks, result: order }));
        }
        const onError = function* (response) {
            ToastAndroid.show('Error al actualizar la lista de canciones', ToastAndroid.LONG)
            yield put(actions.failedFetchTracks());
        }
        yield handleResponse(list, 'tracks/list', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show('Error al actualizar la lista de canciones', ToastAndroid.LONG)
        yield put(actions.failedFetchTracks());
    }
}

function* fetchTracksByGenre(action) {
    try {
        const onSuccess = function* (data, code) {
            const { entities: tracks, result: order } = normalize(data, tracksSchema)
            yield put(actions.completeFetchTracksByGenre({ entities: tracks, result: order }));
        }
        const onError = function* (response) {
            ToastAndroid.show('Error al actualizar la lista de canciones', ToastAndroid.LONG)
            yield put(actions.failedFetchTracksByGenre());
        }
        yield handleResponse(retrieve, { url: 'tracks/genre', id: action.payload }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show('Error al actualizar la lista de canciones', ToastAndroid.LONG)
        yield put(actions.failedFetchTracksByGenre());
    }
}



const watchFetchTracks = function* () {
    yield takeEvery(
        types.FETCH_TRACKS_STARTED,
        fetchTracks,
    );
}
const watchFetchTracksByGenre = function* () {
    yield takeEvery(
        types.FETCH_TRACKS_BY_GENRE_STARTED,
        fetchTracksByGenre,
    );
}

const watchFetchSelectedTrack = function* () {
    yield takeEvery(
        types.FETCH_SELECTED_TRACK_STARTED,
        fetchSelectedTrack,
    );
}

export const watchers = [
    watchFetchTracks,
    watchFetchTracksByGenre,
    watchFetchSelectedTrack,
]



