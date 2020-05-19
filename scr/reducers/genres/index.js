/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import * as types from '../../types/genres';

const genresById = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_GENRES_STARTED: {
            return state;
        }
        case types.FETCH_GENRES_SUCCEDED: {
            const { entities, result } = action.payload
            return entities.genre;
        }
        case types.FETCH_GENRES_FAILED: {
            return state;
        }
    }

    return state;
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_GENRES_STARTED: {
            return state;
        }
        case types.FETCH_GENRES_SUCCEDED: {
            const { entities, result } = action.payload
            return result;
        }
        case types.FETCH_GENRES_FAILED: {
            return state;
        }
    }

    return state;
};
const isFetchingGenres = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_GENRES_STARTED: {
            return true;
        }
        case types.FETCH_GENRES_SUCCEDED: {
            return false;
        }
        case types.FETCH_GENRES_FAILED: {
            return false;
        }
    }

    return state;
};




const genre = combineReducers({
    genresById,
    order,
    isFetchingGenres,
});

export default genre;

export const getGenre = (state, id) => state.genresById[id];
export const getGenres = (state) => state.order.map(id => getGenre(state, id));
export const getIsFetchingGenres = (state) => state.isFetchingGenres;
