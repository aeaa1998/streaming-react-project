/* eslint-disable prettier/prettier */
import * as types from '../types/tracks';


export const startFetchTracks = () => (
    {
        type: types.FETCH_TRACKS_STARTED,
    }
);

export const startFetchTracksByGenre = (genre = 0) => (
    {
        type: genre === 0 ? types.FETCH_TRACKS_STARTED : types.FETCH_TRACKS_BY_GENRE_STARTED,
        payload: genre,
    }
);

export const completeFetchTracks = payload => (
    {
        type: types.FETCH_TRACKS_SUCCEDED,
        payload: payload,
    }
);

export const failedFetchTracks = () => (
    {
        type: types.FETCH_TRACKS_FAILED,
    }
);

export const completeFetchTracksByGenre = payload => (
    {
        type: types.FETCH_TRACKS_BY_GENRE_SUCCEDED,
        payload: payload,
    }
);

export const failedFetchTracksByGenre = () => (
    {
        type: types.FETCH_TRACKS_BY_GENRE_FAILED,
    }
);

export const startFetchSelectedTrack = (id) => (
    {
        type: types.FETCH_SELECTED_TRACK_STARTED,
        payload: { id: id }
    }
);
export const completeFetchSelectedTrack = (track) => (
    {
        type: types.FETCH_SELECTED_TRACK_SUCCEDED,
        payload: { track: track }
    }
);

export const failedFetchSelectedTrack = () => (
    {
        type: types.FETCH_SELECTED_TRACK_FAILED,
    }
);

