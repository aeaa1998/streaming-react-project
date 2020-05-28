import {combineReducers} from 'redux';


import * as types from '../../types/artists';
import actions from 'redux-form/lib/actions';

const albumsById= ( state = {}, action) =>{
    
    switch(action.type) {
        case types.FETCH_ALBUMS_STARTED : {
            return state;
        }

        case types.FETCH_ALBUMS_COMPLETED: {
            const { entities , result } = action.payload;
            return entities.album ?? {};
        }

        case types.FETCH_ALBUMS_FAILED: {
            return state;
        }
    }

};



const order = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_ALBUMS_STARTED: {
            return state;
        }
        case types.FETCH_ALBUMS_COMPLETED: {
            const { entities, result } = action.payload;
            return result;
        }
        case types.FETCH_ALBUMS_FAILED: {
            return state;
        }
    }

    return state;
};



const genresById = (state = {} , action) => {
    switch ( action.type) {
        case types.FETCH_ALBUMS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_ALBUMS_BY_GENRE_COMPLETED:{
            const {entities, result }= action.payload;
            return entities.genreWithAlbums ?? {};

        }
        case types.FETCH_ALBUMS_BY_GENRE_FAILED: {
            return state;
        }
    }
}

const orderGenre = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_ALBUMS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_ALBUMS_BY_GENRE_COMPLETED: {
            const { entities, result } = action.payload;
            return result;
        }
        case types.FETCH_ALBUMS_BY_GENRE_FAILED: {
            return state;
        }
    }

    return state;
};

const albumsByGenreId = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ALBUMS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_ALBUMS_BY_GENRE_COMPLETED: {
            const { entities, result } = action.payload;
            return entities.album ?? {};
        }
        case types.FETCH_ALBUMS_BY_GENRE_FAILED: {
            return state;
        }
    }

    return state;
};



const selectedAlbum = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_ALBUM_STARTED: {
            return {};
        }
        case types.FETCH_SELECTED_ALBUM_COMPLETED: {
            return action.payload.album;
        }
        case types.FETCH_SELECTED_ALBUM_FAILED: {
            return {};
        }
    }
    return state;
};

const isFetchingAlbums = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_ALBUMS_STARTED: {
            return true;
        }
        case types.FETCH_ALBUMS_COMPLETED: {
            return false;
        }
        case types.FETCH_ALBUMS_FAILED: {
            return false;
        }
        case types.FETCH_ALBUMS_BY_GENRE_STARTED: {
            return true;
        }
        case types.FETCH_ALBUMS_BY_GENRE_COMPLETED: {
            return false;
        }
        case types.FETCH_ALBUMS_BY_GENRE_FAILED: {
            return false;
        }
    }

    return state;
};


const isFetchingSelectedAlbum = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_ALBUM_STARTED: {
            return true;
        }
        case types.FETCH_SELECTED_ALBUM_COMPLETED: {
            return false;
        }
        case types.FETCH_SELECTED_ALBUM_FAILED: {
            return true;
        }
    }
    return state;
};





const albumsReducer = combineReducers ({
    albumsByGenreId,
    albumsById,
    genresById,
    isFetchingAlbums,
    isFetchingSelectedAlbum,
    order,
    orderGenre,
    selectedAlbum,
});


export default albumsReducer;

export const getAlbum = (state, id) => state.albumsById[id];
export const getAlbums = (state) => state.order.map(id => getAlbum(state, id));
export const getAlbumsByGenreId = (state) => state.albumsByGenreId;
export const getGenre = (state, id) => state.genresById[id];
export const getGenres = (state) => state.orderGenre.map(id => getGenre(state, id));
export const getIsFetchingAlbums = (state) => state.isFetchingAlbums;
export const getIsFetchingSelectedAlbum = (state) => state.isFetchingSelectedAlbum;
export const getSelectedAlbum = (state) => state.selectedAlbum;
