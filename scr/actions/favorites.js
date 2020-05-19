/* eslint-disable prettier/prettier */
import * as types from '../types/favorites';


export const startFetchFavorites = () => (
    {
        type: types.FETCH_FAVORITES_STARTED,
    }
);


export const completeFetchFavorites = payload => (
    {
        type: types.FETCH_FAVORITES_COMPLETED,
        payload: payload,
    }
);

export const failedFetchFavorites = () => (
    {
        type: types.FETCH_FAVORITES_FAILED,
    }
);

export const startDeleteFavorites = (favorite) => (
    {
        type: types.DELETE_FAVORITES_STARTED,
        payload: { favorite: favorite },
    }
);
export const completedDeleteFavorites = (favorite) => (
    {
        type: types.DELETE_FAVORITES_COMPLETED,
        payload: { favorite: favorite },
    }
); export const failedDeleteFavorites = () => (
    {
        type: types.DELETE_FAVORITES_FAILED,
    }
);

export const startAddFavorites = (favorite) => (
    {
        type: types.ADD_FAVORITES_STARTED,
        payload: { favorite: favorite },
    }
);
export const completedAddFavorites = (favorite) => (
    {
        type: types.ADD_FAVORITES_COMPLETED,
        payload: { favorite: favorite },
    }
); export const failedAddFavorites = () => (
    {
        type: types.ADD_FAVORITES_FAILED,
    }
);



