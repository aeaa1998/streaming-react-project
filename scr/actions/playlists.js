/* eslint-disable prettier/prettier */
import * as types from '../types/playlists';
import { playlistWithTracks } from '../schemas/playlists';
import track from '../reducers/tracks';


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

export const startAddPlaylists = (playlist, callback) => (
    {
        type: types.ADD_PLAYLISTS_STARTED,
        payload: { playlist: playlist, callback: callback },
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
export const completeAddTrackToPlaylist = (playlist, track) => (
    {
        type: types.ADD_TRACK_TO_PLAYLIST_COMPLETED,
        payload: { playlist: playlist, track: track },
    }
);
export const failedAddTrackToPlaylist = () => (
    {
        type: types.ADD_TRACK_TO_PLAYLIST_FAILED,
    }
);

export const startFetchSelectedPlaylist = (id) => (
    {
        type: types.FETCH_SELECTED_PLAYLIST_STARTED,
        payload: { id: id, },
    }
);

export const completeFetchSelectedPlaylist = (playlist) => (
    {
        type: types.FETCH_SELECTED_PLAYLIST_COMPLETED,
        payload: { selectedPlaylist: playlist },
    }
);

export const failedFetchSelectedPlaylist = () => (
    {
        type: types.FETCH_SELECTED_PLAYLIST_FAILED,
    }
)

export const startDeleteTrackFromPlaylist = (playlistId, trackId) => (
    {
        type: types.DELETE_TRACK_FROM_PLAYLIST_STARTED,
        payload: { playlistId: playlistId, trackId: trackId },
    }
);

export const completeDeleteTrackFromPlaylist = (playlistId, trackId) => (
    {
        type: types.DELETE_TRACK_FROM_PLAYLIST_COMPLETED,
        payload: { playlistId: playlistId, trackId: trackId },
    }
);

export const failedDeleteTrackFromPlaylist = () => (
    {
        type: types.DELETE_TRACK_FROM_PLAYLIST_FAILED,
    }
)


