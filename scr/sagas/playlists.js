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
import * as actions from '../actions/playlists';
import * as types from '../types/playlists';
import { create, list, handleResponse, retrieve, deleteAction } from '../components/utils/Api'
import { normalize } from 'normalizr'
import { playlists as playlistsSchema, playlist as playlistSchema, playlistWithTrack } from '../schemas/playlists'
import { ToastAndroid, Toast, Platform } from 'react-native'




function* fetchPlalists(action) {
    const errorMsg = 'Error al cargar las playlists'
    try {
        const onSuccess = function* (data, code) {
            const { entities: playlists, result: order } = normalize(data, playlistsSchema)
            yield put(actions.completeFetchPlaylists({ entities: playlists, result: order }));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchPlaylists());
        }
        yield handleResponse(list, 'playlists/', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchPlaylists());
    }
}

function* addPlaylist(action) {
    const errorMsg = 'Error al agregar la playlist'
    try {
        const onSuccess = function* (playlist, code) {
            action.payload.callback()
            yield put(actions.completedAddPlaylists(playlist));
        }
        const onError = function* (response) {
            const json = yield response.json()
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedAddPlaylists());
        }
        yield handleResponse(create, { url: 'playlists/', data: action.payload.playlist }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedAddPlaylists());
    }
}

function* deletePlaylist(action) {
    const errorMsg = 'Error al eliminar la playlist'
    try {
        const onSuccess = function* (playlist, code) {
            yield put(actions.completedDeletePlaylists(action.payload.playlist));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedDeletePlaylists());
        }
        yield handleResponse(deleteAction, { url: 'playlists', id: action.payload.playlist.id }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedDeletePlaylists());
    }
}

function* deleteTrackFromPlaylist(action) {
    const errorMsg = 'Error al eliminar la canción'
    try {
        const onSuccess = function* (playlist, code) {
            yield put(actions.completeDeleteTrackFromPlaylist(action.payload.playlistId, action.payload.trackId));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedDeletePlaylists());
        }
        yield handleResponse(deleteAction,
            { url: 'playlists/delete/track', id: action.payload.playlistId, data: { track: action.payload.trackId } },
            onSuccess, onError)
    } catch (error) {
        console.log(error)
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedDeletePlaylists());
    }
}

function* addTrackToPlaylist(action) {
    const errorMsg = `Error al agregar la cancion ${action.payload.track.name} a la playlist`
    try {
        const onSuccess = function* (message, code) {
            ToastAndroid.show("La canción se ha agregado de manera exitosa a la playlist", ToastAndroid.LONG)
            yield put(actions.completeAddTrackToPlaylist(action.payload.playlist, action.payload.track));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedAddTrackToPlaylist());
        }
        const data = { track: action.payload.track.id }
        yield handleResponse(create, { url: `playlists/add/track/${action.payload.playlist.id}/`, data: data }, onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedAddTrackToPlaylist());
    }
}


function* fetchSelectedPlaylist(action) {
    const errorMsg = 'Error al cargar la playlist';
    try {
        const onSuccess = function* (data, code) {
            yield put(actions.completeFetchSelectedPlaylist(data));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchSelectedPlaylist());
        }
        yield handleResponse(retrieve, { url: 'playlists', id: action.payload.id }, onSuccess, onError)
    } catch (error) {
        console.log(error)
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchSelectedPlaylist());
    }
}

const watchFetchPlaylists = function* () {
    yield takeEvery(
        types.FETCH_PLAYLISTS_STARTED,
        fetchPlalists,
    );
};

const watchAddPlaylist = function* () {
    yield takeEvery(
        types.ADD_PLAYLISTS_STARTED,
        addPlaylist,
    );
};

const watchDeletePlaylist = function* () {
    yield takeEvery(
        types.DELETE_PLAYLISTS_STARTED,
        deletePlaylist,
    );
};

const watchFetchSelectedPlaylist = function* () {
    yield takeEvery(
        types.FETCH_SELECTED_PLAYLIST_STARTED,
        fetchSelectedPlaylist,
    );
};

const watchAddTrackToPlaylist = function* () {
    yield takeEvery(
        types.ADD_TRACK_TO_PLAYLIST_STARTED,
        addTrackToPlaylist,
    );
};

const watchDeleteTrackFromPlaylist = function* () {
    yield takeEvery(
        types.DELETE_TRACK_FROM_PLAYLIST_STARTED,
        deleteTrackFromPlaylist,
    );
};

export const watchers = [
    watchFetchPlaylists,
    watchAddPlaylist,
    watchDeletePlaylist,
    watchAddTrackToPlaylist,
    watchFetchSelectedPlaylist,
    watchDeleteTrackFromPlaylist,
];



