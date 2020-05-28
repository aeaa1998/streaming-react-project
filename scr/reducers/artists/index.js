/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import * as types from '../../types/artists';
import actions from 'redux-form/lib/actions';

const artistsById = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ARTISTS_STARTED: {
            return state;
        }
        case types.FETCH_ARTISTS_COMPLETED: {
            const { entities, result } = action.payload;
            return entities.artist ?? {};
        }
        case types.FETCH_ARTISTS_FAILED: {
            return state;
        }
    }

    return state;
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_ARTISTS_STARTED: {
            return state;
        }
        case types.FETCH_ARTISTS_COMPLETED: {
            const { entities, result } = action.payload;
            return result;
        }
        case types.FETCH_ARTISTS_FAILED: {
            return state;
        }
    }

    return state;
};

const artistsByGenreId = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ARTISTS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_ARTISTS_BY_GENRE_COMPLETED: {
            const { entities, result } = action.payload;
            return entities.artist ?? {};
        }
        case types.FETCH_ARTISTS_BY_GENRE_FAILED: {
            return state;
        }
    }

    return state;
};

const genresById = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ARTISTS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_ARTISTS_BY_GENRE_COMPLETED: {
            const { entities, result } = action.payload;
            return entities.genreWithArtists ?? {};
        }
        case types.FETCH_ARTISTS_BY_GENRE_FAILED: {
            return state;
        }
    }

    return state;
};

const orderGenre = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_ARTISTS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_ARTISTS_BY_GENRE_COMPLETED: {
            const { entities, result } = action.payload;
            return result;
        }
        case types.FETCH_ARTISTS_BY_GENRE_FAILED: {
            return state;
        }
    }

    return state;
};



const selectedArtist = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_ARTIST_STARTED: {
            return {};
        }
        case types.FETCH_SELECTED_ARTIST_COMPLETED: {
            return action.payload.artist;
        }
        case types.FETCH_SELECTED_ARTIST_FAILED: {
            return {};
        }
    }
    return state;
};

const isFetchingSelectedArtist = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_ARTIST_STARTED: {
            return true;
        }
        case types.FETCH_SELECTED_ARTIST_COMPLETED: {
            return false;
        }
        case types.FETCH_SELECTED_ARTIST_FAILED: {
            return true;
        }
    }
    return state;
};


const isFetchingArtists = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_ARTISTS_STARTED: {
            return true;
        }
        case types.FETCH_ARTISTS_COMPLETED: {
            return false;
        }
        case types.FETCH_ARTISTS_FAILED: {
            return false;
        }
        case types.FETCH_ARTISTS_BY_GENRE_STARTED: {
            return true;
        }
        case types.FETCH_ARTISTS_BY_GENRE_COMPLETED: {
            return false;
        }
        case types.FETCH_ARTISTS_BY_GENRE_FAILED: {
            return false;
        }
    }

    return state;
};





const artistsReducer = combineReducers({
    artistsById,
    isFetchingArtists,
    order,
    orderGenre,
    genresById,
    artistsByGenreId,
    isFetchingSelectedArtist,
    selectedArtist,
});

export default artistsReducer;

export const getArtist = (state, id) => state.artistsById[id];
export const getArtists = (state) => state.order.map(id => getArtist(state, id));
export const getArtistsByGenreId = (state) => state.artistsByGenreId;
export const getGenre = (state, id) => state.genresById[id];
export const getGenres = (state) => state.orderGenre.map(id => getGenre(state, id));
export const getIsFetchingArtists = (state) => state.isFetchingArtists;
export const getIsFetchingSelectedArtist = (state) => state.isFetchingSelectedArtist;
export const getSelectedArtist = (state) => state.selectedArtist;

