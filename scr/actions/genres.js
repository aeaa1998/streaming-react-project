/* eslint-disable prettier/prettier */
import * as types from '../types/genres';


export const startFetchGenres = () => (
    {
        type: types.FETCH_GENRES_STARTED,
    }
);


export const completeFetchGenres = payload => (
    {
        type: types.FETCH_GENRES_SUCCEDED,
        payload: payload,
    }
);

export const failedFetchGenres = () => (
    {
        type: types.FETCH_GENRES_FAILED,
    }
);



