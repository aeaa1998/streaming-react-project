/* eslint-disable prettier/prettier */
import * as types from '../types/artists';


export const startFetchArtists = () => (
    {
        type: types.FETCH_ARTISTS_STARTED,
    }
);


export const completeFetchArtists = payload => (
    {
        type: types.FETCH_ARTISTS_COMPLETED,
        payload: payload,
    }
);

export const failedFetchArtists = () => (
    {
        type: types.FETCH_ARTISTS_FAILED,
    }
);


export const startFetchSelectedArtists = (artistId) => (
    {
        type: types.FETCH_SELECTED_ARTIST_STARTED,
        payload: { artistId: artistId },
    }
);


export const completeFetchSelectedArtists = artist => {
    return {
        type: types.FETCH_SELECTED_ARTIST_COMPLETED,
        payload: { artist: artist },
    }
};

export const failedFetchSelectedArtists = () => (
    {
        type: types.FETCH_SELECTED_ARTIST_FAILED,
    }
);

export const startFetchArtistsByGenre = () => (
    {
        type: types.FETCH_ARTISTS_BY_GENRE_STARTED,
    }
);


export const completeFetchArtistsByGenre = payload => (
    {
        type: types.FETCH_ARTISTS_BY_GENRE_COMPLETED,
        payload: payload,
    }
);

export const failedFetchArtistsByGenre = () => (
    {
        type: types.FETCH_ARTISTS_BY_GENRE_FAILED,
    }
);
