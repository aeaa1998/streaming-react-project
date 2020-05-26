/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import _ from 'lodash'
import * as types from '../../types/playlists';

const playlistsById = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_PLAYLISTS_STARTED: {
            return state;
        }
        case types.FETCH_PLAYLISTS_COMPLETED: {
            const { entities, result } = action.payload
            return entities.playlist ?? {};
        }
        case types.ADD_PLAYLISTS_COMPLETED: {
            let newState = { ...state }
            newState[action.payload.playlist.id] = action.payload.playlist
            return { ...newState }
        }
        case types.FETCH_PLAYLISTS_FAILED: {
            return state;
        }
        case types.DELETE_PLAYLISTS_COMPLETED: {
            return _.omit(state, [action.payload.playlist.id])
        }
        case types.ADD_TRACK_TO_PLAYLIST_COMPLETED: {
            let newState = { ...state }
            const tracks = newState[action.payload.playlist.id]['tracks']
            newState[action.payload.playlist.id]['tracks'] = [...tracks, action.payload.track.id]
            return { ...newState };
        }
        case types.DELETE_TRACK_FROM_PLAYLIST_COMPLETED: {
            let newState = { ...state }
            const tracks = newState[action.payload.playlistId]['tracks'].filter(id => action.payload.trackId != id)
            newState[action.payload.playlistId]['tracks'] = [...tracks]
            return { ...newState };
        }
    }
    return state;
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_PLAYLISTS_STARTED: {
            return state;
        }
        case types.FETCH_PLAYLISTS_COMPLETED: {
            const { entities, result } = action.payload
            return result;
        }
        case types.FETCH_PLAYLISTS_FAILED: {
            return state;
        }
        case types.ADD_PLAYLISTS_COMPLETED: {
            return [...state, action.payload.playlist.id]
        }
        case types.DELETE_PLAYLISTS_COMPLETED: {
            return state.filter(id => id != action.payload.playlist.id)
        }
    }

    return state;
};
const isFetchingPlaylists = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_PLAYLISTS_STARTED: {
            return true;
        }
        case types.FETCH_PLAYLISTS_COMPLETED: {
            return false;
        }
        case types.FETCH_PLAYLISTS_FAILED: {
            return false;
        }
    }

    return state;
};

const isAddingTrackToPlaylist = (state = false, action) => {
    switch (action.type) {
        case types.ADD_TRACK_TO_PLAYLIST_STARTED: {
            return true;
        }
        case types.ADD_TRACK_TO_PLAYLIST_FAILED: {
            return false;
        }
        case types.ADD_TRACK_TO_PLAYLIST_COMPLETED: {
            return false;
        }
    }

    return state;
};

const isAddingPlaylist = (state = false, action) => {
    switch (action.type) {
        case types.ADD_PLAYLISTS_STARTED: {
            return true;
        }
        case types.ADD_PLAYLISTS_COMPLETED: {
            return false;
        }
        case types.ADD_PLAYLISTS_FAILED: {
            return false;
        }
    }

    return state;
};

const isDeletingPlaylist = (state = false, action) => {
    switch (action.type) {
        case types.DELETE_PLAYLISTS_STARTED: {
            return true;
        }
        case types.DELETE_PLAYLISTS_COMPLETED: {
            return false;
        }
        case types.DELETE_PLAYLISTS_FAILED: {
            return false;
        }
    }

    return state;
};




const playlistsReducer = combineReducers({
    playlistsById,
    order,
    isFetchingPlaylists,
    isAddingPlaylist,
    isDeletingPlaylist,
});

export default playlistsReducer;

export const getPlaylist = (state, id) => state.playlistsById[id];
export const getPlaylists = (state) => state.order.map(id => getPlaylist(state, id)).filter(playlist => playlist != undefined);
export const getIsFetchingPlaylists = (state) => state.isFetchingPlaylists;
export const getIsAddingPlaylists = (state) => state.isAddingPlaylist;
export const getIsDeletingPlaylist = (state) => state.isDeletingPlaylist;
