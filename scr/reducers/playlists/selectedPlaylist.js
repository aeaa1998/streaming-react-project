/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import _ from 'lodash';
import * as types from '../../types/playlists';

const selectedPlaylist = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_PLAYLIST_COMPLETED: {
            return action.payload.selectedPlaylist;
        }
        case types.FETCH_SELECTED_PLAYLIST_FAILED: {
            return {};
        }
        case types.DELETE_TRACK_FROM_PLAYLIST_COMPLETED: {
            let newState = { ...state }
            const tracks = newState['tracks'].filter(track => action.payload.trackId != track.id)
            newState['tracks'] = [...tracks]
            return { ...newState };
        }
    }
    return state;
};


const isFetchingSelectedPlaylist = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_PLAYLIST_STARTED: {
            return true;
        }
        case types.FETCH_SELECTED_PLAYLIST_COMPLETED: {
            return false;
        }
        case types.FETCH_SELECTED_PLAYLIST_FAILED: {
            return false;
        }
    }
    return state;
};

const isDeletingTrackFromPlaylist = (state = false, action) => {
    switch (action.type) {
        case types.DELETE_TRACK_FROM_PLAYLIST_STARTED: {
            return true;
        }
        case types.DELETE_TRACK_FROM_PLAYLIST_COMPLETED: {
            return false;
        }
        case types.DELETE_TRACK_FROM_PLAYLIST_FAILED: {
            return false;
        }
    }
    return state;
};

const selectedPlaylistReducer = combineReducers({
    selectedPlaylist,
    isDeletingTrackFromPlaylist,
    isFetchingSelectedPlaylist,
});

export default selectedPlaylistReducer;

export const getSelectedPlaylist = state => state.selectedPlaylist;
export const getSelectedPlaylistTracks = state => state.selectedPlaylistTracks;
export const getIsFetchingSelectedPlaylist = state => state.isFetchingSelectedPlaylist;
export const getIsDeletingTrackFromPlaylist = state => state.isDeletingTrackFromPlaylist;
