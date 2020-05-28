import * as types from '../types/albums';


export const startFetchAlbums = () => (
    {
        type: types.FETCH_ALBUMS_STARTED,
    }
);


export const completeFetchAlbums = payload => (
    {
        type: types.FETCH_ALBUMS_COMPLETED,
        payload: payload,
    }
);

export const failedFetchAlbums = () => (
    {
        type: types.FETCH_ALBUMS_FAILED,
    }
);


export const startFetchSelectedAlbums = (albumId) => (
    {
        type: types.FETCH_SELECTED_ALBUM_STARTED,
        payload: { albumId: albumId },
    }
);


export const completeFetchSelectedAlbums = album => {
    return {
        type: types.FETCH_SELECTED_ALBUM_COMPLETED,
        payload: { album: album },
    }
};

export const failedFetchSelectedAlbums = () => (
    {
        type: types.FETCH_SELECTED_ALBUM_FAILED,
    }
);

export const startFetchAlbumsByGenre = () => (
    {
        type: types.FETCH_ALBUMS_BY_GENRE_STARTED,
    }
);


export const completeFetchAlbumsByGenre = payload => (
    {
        type: types.FETCH_ALBUMS_BY_GENRE_COMPLETED,
        payload: payload,
    }
);

export const failedFetchAlbumsByGenre = () => (
    {
        type: types.FETCH_ALBUMS_BY_GENRE_FAILED,
    }
);
