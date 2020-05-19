/* eslint-disable prettier/prettier */
import * as types from '../types/playlists';


export const startFetchPlaylists = () => (
    {
        type: types.FETCH_PLAYLISTS_STARTED,
    }
);


export const completeFetchPlaylists = payload => (
    {
        type: types.FETCH_PLAYLISTS_COMPLETED,
        payload: payload,
    }
);

export const failedFetchPlaylists = () => (
    {
        type: types.FETCH_PLAYLISTS_FAILED,
    }
);

export const startDeletePlaylists = (playlist) => (
    {
        type: types.DELETE_PLAYLISTS_STARTED,
        payload: { playlist: playlist },
    }
);
export const completedDeletePlaylists = (playlist) => (
    {
        type: types.DELETE_PLAYLISTS_COMPLETED,
        payload: { playlist: playlist },
    }
); export const failedDeletePlaylists = () => (
    {
        type: types.DELETE_PLAYLISTS_FAILED,
    }
);

export const startAddPlaylists = (playlist) => (
    {
        type: types.ADD_PLAYLISTS_STARTED,
        payload: { playlist: playlist },
    }
);
export const completedAddPlaylists = (playlist) => (
    {
        type: types.ADD_PLAYLISTS_COMPLETED,
        payload: { playlist: playlist },
    }
);
export const failedAddPlaylists = () => (
    {
        type: types.ADD_PLAYLISTS_fAILED,
    }
);

export const startAddTrackToPlaylist = (playlist, track) => (
    {
        type: types.ADD_TRACK_TO_PLAYLIST_STARTED,
        payload: { playlist: playlist, track: track },
    }
);
export const completeAddTrackToPlaylist = (playlist) => (
    {
        type: types.ADD_TRACK_TO_PLAYLIST_COMPLETED,
        payload: { playlist: playlist },
    }
);
export const failedAddTrackToPlaylist = () => (
    {
        type: types.ADD_TRACK_TO_PLAYLIST_FAILED,
    }
);



